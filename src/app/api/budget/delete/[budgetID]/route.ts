import { PrismaClient} from "@prisma/client"; // update with your prisma location
import { NextResponse } from "next/server";
const prisma = new PrismaClient()

export async function DELETE(
  req: Request,
  { params }: { params: { budgetID: string } }
) {
  try {
    const deleted = await prisma.budget.delete({
      where: {
        id: params.budgetID,
      },
    });

    return NextResponse.json({ success: true, deleted });
  } catch (err) {
    console.error("Failed to delete budget:", err);
    return new NextResponse("Failed to delete budget", { status: 500 });
  }
}
