import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { countries } from "./seed-countries";

async function main() {
  // 1. Delete existing records
  // await Promise.all([

  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  await prisma.category.deleteMany();
  // ]);

  // 0. Users

  await prisma.user.createMany({
    data: initialData.users,
  });

  // 2. Category

  const { categories, products } = initialData;

  const categoriesData = categories.map((category) => {
    return { name: category };
  });
  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // 3. Products

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: { ...rest, categoryId: categoriesMap[type] },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  // 4. Images

  // 5. Coutries

  await prisma.country.createMany({ data: countries });

  console.log("Seed successfully executed!");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
