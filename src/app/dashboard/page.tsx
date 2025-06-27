import { MainChart } from "@/components/Charts/Charts";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { ChartArea, LucideLogOut } from "lucide-react";
const { getUser } = getKindeServerSession();
const username = await getUser();
export default function Dashboard() {}
