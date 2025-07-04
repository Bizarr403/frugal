import { handleAuth,getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = handleAuth({
  async callback(req) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      throw new Error("Something went wrong with authentication: " + JSON.stringify(user));
    }

    let dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          kindeId: user.id,
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
        },
      });
    }

    return NextResponse.redirect("http://localhost:3000/dashboard");
  },
});
