export type BudgetItem = {
  
    name: string;
    color: string;
    amount: number;
  };
  
  export type BudgetMonth = {
    id:string,
    month: string;       // Format: "YYYY-MM"
    total: number;
    budgetItems: BudgetItem[];
  };
  