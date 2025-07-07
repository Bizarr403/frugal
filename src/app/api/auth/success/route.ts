// src/app/api/auth/success/route.ts
import { PrismaClient } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const { getUser } = getKindeServerSession(); // ✅ Called inside handler
  const user = await getUser();
  if (!user || !user.id) {
    throw new Error("Authentication failed");
  }

  await prisma.user.upsert({
    where: { kindeId: user.id },
    update: {},
    create: {
      kindeId: user.id,
      firstName: user.given_name ?? "",
      lastName: user.family_name ?? "",
      email: user.email ?? "",
    },
  });

  return NextResponse.redirect("http://localhost:3000/dashboard");
}
