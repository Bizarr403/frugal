import { handleAuth, getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = handleAuth({
  async callback(req) {
    const {getUser}  = getKindeServerSession();
    const user = await getUser()

    if (!user || !user.id) {
      throw new Error("Authentication failed");
    }

    // Upsert user in your database
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

    // Redirect to dashboard after success
    return NextResponse.redirect("http://localhost:3000/dashboard");
  },
});
