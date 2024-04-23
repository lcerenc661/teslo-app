"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (id: string) => {
  try {
    const address = await prisma.userAddress.findFirst({
      where: { userId: id },
    });
    if (address) {
      await prisma.userAddress.delete({
        where: { userId: id },
      });
    }
    return {
      ok: true,
      message: "address deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Unable to delete user's address",
    };
  }
};
