"use server";

import prisma from "@/lib/prisma";
import identityServer4 from "next-auth/providers/identity-server4";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        transactionId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: `Unable to find order with id: ${orderId}`,
      };
    }

    return {
      ok: true,
      message: "Updated transaction id",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Unable to updated transaction id",
    };
  }
};
