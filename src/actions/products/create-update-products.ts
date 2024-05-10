"use server";

import { z } from "zod";

import { Gender, Product, Size } from "@prisma/client";
import prisma from "@/lib/prisma";
import { table } from "console";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const ProductSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProducts = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsedProduct = ProductSchema.safeParse(data);

  if (!parsedProduct.success) {
    console.log(parsedProduct.error);
    return {
      ok: false,
      message: JSON.stringify(parsedProduct.error),
    };
  }

  const product = parsedProduct.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());
      if (id) {
        // Update
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });

        console.log({ updatedProduct: product });
      } else {
        // Create

        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
        return product;
      }

      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (!images) {
          throw new Error("Not able to load images, rolling back");
        }

        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return product;
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      updatedProduct: prismaTx,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Review Logs, unable to create product",
    };
  }
};

const uploadImages = async (files: File[]) => {
  try {
    const uploadPromises = files.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadImages = await Promise.all(uploadPromises);
    return uploadImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
