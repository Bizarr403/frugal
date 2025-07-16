import { NextRequest, NextResponse } from "next/server";
import { PrismaClient} from "@prisma/client"; // adjust this path if needed
const prisma = new PrismaClient();

export async function GET(req: NextRequest, params) {
  const userID:string = params.userID
  try {

    if (!params.userID) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const userBudget = await prisma.budget.findMany({
      where: {
        user: {
          userId: userID,
        },
      },
      include: {
        budgetItems: true, // include related items if needed
      },
    });

    return NextResponse.json(userBudget, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch budget:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
 