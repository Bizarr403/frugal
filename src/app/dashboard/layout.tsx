import type { Metadata } from "next";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import Side from "@/components/Sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChartArea, Plus, Smile, LucideLogOut } from "lucide-react";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard",
};
const { getUser } = getKindeServerSession();
const username = await getUser();
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <Side />

      {/* Main Content (scrollable) */}
      <main className="ml-64 flex-1 overflow-x-auto bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}
