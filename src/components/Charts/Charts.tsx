"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
  Plus,
  X,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  CardFooter,
} from "@/components/Charts/ChartBarrel";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { BudgetItem, BudgetMonth } from "@/type";
const chartConfig = {
  total: { label: "Total", color: "black" },
  needs: { label: "Needs", color: "#60a5fa" },
  wants: { label: "Wants", color: "red" },
  savings: { label: "Savings", color: "green" },
} satisfies ChartConfig;
const chartData = [
  { month: "January", total: 800, needs: 400, wants: 240, savings: 160 },
  { month: "February", total: 750, needs: 375, wants: 225, savings: 150 },
  { month: "March", total: 300, needs: 150, wants: 90, savings: 60 },
  { month: "April", total: 400, needs: 200, wants: 120, savings: 80 },
  { month: "May", total: 500, needs: 250, wants: 150, savings: 100 },
  { month: "June", total: 1000, needs: 500, wants: 300, savings: 200 },
];

export function HeroChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="hidden md:flex max-h-[200px] w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 12)}
        />
        <YAxis
          dataKey="total"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="needs" fill="var(--color-needs)" radius={4} />
        <Bar dataKey="wants" fill="var(--color-wants)" radius={4} />
        <Bar dataKey="savings" fill="var(--color-savings)" radius={4} />
        <Bar dataKey="total" fill="var(--color-total)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export function MainChart({ userID }: { userID: string | undefined }) {
  const [budget, setBudget] = useState([
    {
      month: "",
      total: 0,
      budgetItems: [
        {
          name: "Food",
          color: "#000000",
          amount: 0,
        },
      ],
    },
  ]);
  const dataByMonth = budget.map((monthBudget) => {
    const monthName = new Date(monthBudget.month).toLocaleString("default", {
      month: "long",
      year: "2-digit",
    });

    const entry: any = {
      month: monthName,
      Total: monthBudget.total,
    };

    monthBudget.budgetItems.forEach((cat) => {
      entry[cat.name] = cat.amount;
    });

    return entry;
  });

  const allCategories = Array.from(
    new Set(
      budget.flatMap((monthBudget) =>
        monthBudget.budgetItems.map((cat) => cat.name)
      )
    )
  );
  const chartConfig = budget
    .flatMap((monthBudget) => monthBudget.budgetItems)
    .reduce((config, item) => {
      if (!config[item.name]) {
        config[item.name] = {
          label: item.name,
          color: item.color,
        };
      }
      return config;
    }, {} as Record<string, { label: string; color: string }>);

  return (
    <div className="grid md:grid-cols-4 w-full h-auto gap-4 p-2 md:p-4 place-items-center ">
      <Card className="bg-zinc-200/10 backdrop-blur-md shadow-lg col-span-2  place-items-center h-fit w-fit p-1">
        <CardHeader className="flex justify-center items-center ">
          <CardTitle className="text-2xl text-center text-nowrap font-semibold text-gray-800">
            SET YOUR BUDGET
          </CardTitle>
        </CardHeader>
        <CardContent className="grid p-4 gap-2 max-h-[400px] overflow-y-auto">
          <div className="w-full   p-4">
            {budget.map((item, bIndex) => (
              <div
                key={bIndex}
                className="grid  h-fit mb-8 p-4 border-2  max-h-[400px] overflow-y-auto border-solid rounded-sm"
              >
                <div className="grid grid-rows-3 gap-2 w-full">
                  <h1 className="text-center text-zinc-600 font-semibold">
                    {new Date(item.month).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h1>
                  <div className="grid gap-2 ">
                    <div className="flex justify-evenly items-center gap-2 ">
                      <Label>Income</Label>
                      <Input
                        type="number"
                        value={item.total}
                        onChange={(e) => {
                          const updatedBudget = [...budget];
                          updatedBudget[bIndex].total = Number(e.target.value);
                          setBudget(updatedBudget);
                        }}
                      />
                    </div>
                    <div className="flex justify-evenly items-center gap-2 ">
                      <Label>Month</Label>
                      <Input
                        type="month"
                        value={item.month}
                        onChange={(e) => {
                          const updatedBudget = [...budget];
                          updatedBudget[bIndex].month = e.target.value;
                          setBudget(updatedBudget);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {item.budgetItems.map((cat, cIndex) => (
                  <div
                    key={cIndex}
                    className="mb-2 overflow-y-auto p-4 border-2 border-solid rounded-sm"
                  >
                    <div className="flex justify-center items-center gap-2">
                      <Label className="text-nowrap">
                        Category {cIndex + 1}
                      </Label>
                      <Input
                        type="text"
                        value={cat.name}
                        placeholder="Enter a category e.g. Utilities"
                        onChange={(e) => {
                          const updatedBudget = [...budget];
                          updatedBudget[bIndex].budgetItems[cIndex].name =
                            e.target.value;

                          setBudget(updatedBudget);
                        }}
                        className="w-full"
                      />
                      <Input
                        type="color"
                        value={cat.color}
                        onChange={(e) => {
                          const updatedBudget = [...budget];
                          updatedBudget[bIndex].budgetItems[cIndex].color =
                            e.target.value;
                          setBudget(updatedBudget);
                        }}
                        className="w-10 p-1"
                      />
                    </div>
                    <div className="grid grid-rows-2 ">
                      <div className="flex justify-evenly items-center gap-2 ">
                        <Label>Amount</Label>

                        <Input
                          value={cat.amount}
                          onChange={(val) => {
                            const updatedBudget = [...budget];
                            updatedBudget[bIndex].budgetItems[cIndex].amount =
                              Number(val.target.value);
                            if (
                              isNaN(
                                updatedBudget[bIndex].budgetItems[cIndex].amount
                              )
                            ) {
                              updatedBudget[bIndex].budgetItems[
                                cIndex
                              ].amount = 0;
                            } else {
                              setBudget(updatedBudget);
                            }
                          }}
                          className="w-full"
                        />
                      </div>
                      <div className="text-sm flex justify-center items-center gap-2 p-4 w-full text-gray-700">
                        <p>
                          {cat.amount > 0
                            ? `${((cat.amount / item.total) * 100).toFixed(2)}%`
                            : "0%"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-evenly items-center">
                      <Button
                        variant="default"
                        className="w-fit"
                        onClick={() => {
                          const updatedBudget = [...budget];
                          updatedBudget[bIndex].budgetItems.push({
                            name: "",
                            color: "#000000",
                            amount: 0,
                          });
                          setBudget(updatedBudget);
                        }}
                      >
                        <Plus />
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-10"
                        onClick={() => {
                          const updatedBudget = [...budget];
                          updatedBudget[bIndex].budgetItems = updatedBudget[
                            bIndex
                          ].budgetItems.filter((_, i) => i !== bIndex);
                          setBudget(updatedBudget);
                        }}
                        disabled={
                          budget[bIndex].budgetItems.length <= 1 ? true : false
                        }
                      >
                        <X />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-evenly items-center">
                  <Button
                    variant="secondary"
                    className="w-fit  p-1"
                    onClick={() => {
                      const updatedBudget = [...budget];
                      updatedBudget.push({
                        month: "",
                        total: 0,
                        budgetItems: [
                          { name: "", color: "#0000000", amount: 0 },
                        ],
                      });
                      setBudget(updatedBudget);
                    }}
                  >
                    New Month
                    <Plus />
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-10"
                    onClick={() => {
                      const updatedBudget = budget.filter(
                        (_, i) => i !== bIndex
                      );
                      setBudget(updatedBudget);
                    }}
                    disabled={budget.length <= 1 ? true : false}
                  >
                    <X />
                  </Button>
                </div>
              </div>
            ))}
            <CardFooter className="w-full justify-center">
              <Button
                onClick={async () => {
                  try {
                    const updatedBudgets = budget.map((entry) => {
                      const totalAllocated = entry.budgetItems.reduce(
                        (sum, item) => sum + Number(item.amount),
                        0
                      );

                      const difference = entry.total - totalAllocated;

                      // Case: sum exceeds total
                      if (difference < 0) {
                        throw new Error(
                          `Total for ${
                            entry.month || "a month"
                          } is less than allocated items you'll be in debt.`
                        );
                        toast.error("Budget is more than income");
                      }

                      // Case: under budget — add Savings item
                      if (difference > 0) {
                        return {
                          ...entry,
                          budgetItems: [
                            ...entry.budgetItems,
                            {
                              name: "Savings",
                              amount: difference,
                              color: "#00FF00", // bright green
                            },
                          ],
                        };
                      }

                      // Case: exact match
                      return entry;
                    });

                    toast.info("Saving your budget...");

                    await axios.post("/api/budget/add", {
                      budgets: updatedBudgets,
                      userId: userID,
                    });

                    toast.success("Budget saved successfully!");
                    setBudget([
                      {
                        month: "",
                        total: 0,
                        budgetItems: [
                          {
                            name: "",
                            color: "#000000",
                            amount: 0,
                          },
                        ],
                      },
                    ]);
                  } catch (error: unknown) {
                    toast.error("Failed to save budget!");
                    console.error("Failed to add budgets", error);
                  }
                }}
                className="bg-green-400"
              >
                Set Budget
              </Button>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
      <ChartContainer
        config={chartConfig}
        className="w-full col-span-2 justify-center max-h-[500px]"
      >
        <BarChart accessibilityLayer data={dataByMonth}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          {allCategories.map((catName, index) => {
            const color =
              budget
                .flatMap((b) => b.budgetItems)
                .find((c) => c.name === catName)?.color || "#8884d8";

            return (
              <Bar
                key={index}
                dataKey={catName}
                fill={color}
                width={12}
                radius={4}
              />
            );
          })}

          {/* Savings Bar */}
          <Bar
            dataKey="Savings"
            fill="#00FF20" // bright green
            radius={4}
          />

          {/* Total Bar */}
          <Bar dataKey="Total" fill="#99D5C9" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export function FilteredCharts({ userID }: { userID: string | undefined }) {
  const [budgets, setBudgets] = useState<BudgetMonth[]>([]);

  useEffect(() => {
    if (!userID) return;

    const fetchBudgets = async () => {
      try {
        const res = await axios.get(`/api/budget/filter/${userID}`);
        setBudgets(res.data);
      } catch (error) {
        console.error("Failed to fetch budgets", error);
      }
    };

    fetchBudgets();
  }, [userID]);

  if (budgets.length === 0)
    return (
      <div className="w-full h-full flex justify-center gap-2 items-center">
        <p className="text-2xl font-bold text-red-400">No budgets found.</p>
        <Button variant="link">
          <Link className="flex items-center" href="/dashboard/create">
            Set budget <Plus />
          </Link>
        </Button>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {budgets.map((budget, index) => {
        const monthName = new Date(budget.month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        });

        const chartData = [
          budget.budgetItems.reduce(
            (acc: any, item: BudgetItem) => {
              acc[item.name] = item.amount;
              return acc;
            },
            { month: monthName, Total: budget.total }
          ),
        ];

        const chartConfig = budget.budgetItems.reduce(
          (config: ChartConfig, item: BudgetItem) => {
            config[item.name] = { label: item.name, color: item.color };
            return config;
          },
          {}
        );

        return (
          <div key={index} className="w-full">
            <h2 className="text-lg font-semibold mb-2">
              Budget for {monthName}{" "}
              <Button
                variant="destructive"
                onClick={async () => {
                  try {
                    await axios.delete(`/api/budget/delete/${budget.id}`);
                    setBudgets((prev) =>
                      prev.filter((b) => b.id !== budget.id)
                    );
                    toast.success("Budget deleted successfully");
                  } catch (err) {
                    toast.error("Failed to delete the budget");
                    console.error("Failed to delete budget", err);
                  }
                }}
              >
                <Trash2 />
              </Button>
            </h2>
            <ChartContainer
              config={chartConfig}
              className="w-full justify-center max-h-[300px]"
            >
              <BarChart accessibilityLayer data={chartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                {budget.budgetItems.map((cat: BudgetItem, i: number) => (
                  <Bar
                    key={i}
                    dataKey={cat.name}
                    fill={cat.color}
                    width={12}
                    radius={4}
                  />
                ))}
                <Bar dataKey="Total" fill="#99D5C9" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        );
      })}
    </div>
  );
}
