import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { BudgetItem } from "@/type";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { budgets, userId } = body;

  try {
    for (const b of budgets) {
      await prisma.budget.create({
        data: {
          month: b.month,
          total: b.total,
          user: {
            connect: {
              kindeId: userId, // or use `id` or `email` if you store those instead
            },
          },budgetItems: {
            create: b.budgetItems.map((item: BudgetItem) => ({
              name: item.name,
              color: item.color,
              amount: item.amount,
            })),
          },
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

