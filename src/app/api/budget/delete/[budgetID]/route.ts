import { PrismaClient} from "@prisma/client"; // update with your prisma location
import { NextResponse, NextRequest } from "next/server";
const prisma = new PrismaClient()

export async function DELETE(
  req: NextRequest, {params}:{params:{budgetID:string}}
  ) {
    const budgetID  = params.budgetID;
    try {
    const deleted = await prisma.budget.delete({
      where: {
        id: budgetID,
      },
    });

    return NextResponse.json({ success: true, deleted });
  } catch (err:unknown) {
    console.error("Failed to delete budget:", err);
    return new NextResponse("Failed to delete budget", { status: 500 });
  }
}
