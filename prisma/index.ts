import { PrismaClient } from "@prisma/client";
import { BudgetMonth } from "@/type";
const prisma = new PrismaClient()
import { ToastContainer, toast } from 'react-toastify';
import { LucideCheckCircle2 } from "lucide-react";


export async function addBudgetsToDB(budgets: BudgetMonth[], userID:string|undefined) {
  try {
    for (const b of budgets) {
      await prisma.budget.create({
        data: {
          month: b.month,
          total: b.total,
          user: {
            connect: {
              userId: userID, // or use `id` or `email` if you store those instead
            },
          },budgetItems: {
            create: b.budgetItems.map((item: any) => ({
              name: item.name,
              color: item.color,
              amount: item.amount,
            })),
          },
        },
      });

        
      
    
    
      console.log("Budget created successfully!");
      toast('Budget created successfully!')
      
    }
   
  }catch (error) {
    console.error("Error inserting budgets:", error);
}}

export async function filterBudgets(userID:string|undefined){
  try{
   const userBudget =  await prisma.budget.findMany({
      where:{user:{userId:userID}}
    })
    return userBudget

  }catch(error){
    
  }
}