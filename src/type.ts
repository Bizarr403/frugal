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
  
  export type entry = {
    month:string,
    total:number,
    [key: string]: string | number;
  }

  export type ChartDataEntry = {
    month: string;
    Total: number;
    [key: string]: string | number;
  };
  