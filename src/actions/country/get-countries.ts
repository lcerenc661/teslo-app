"use server";

import prisma from "@/lib/prisma";
import { countries } from "../../seed/seed-countries";

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return countries;
  } catch (error) {
    console.log(error);
    return [];
  }
};
