import type { Metadata } from "next";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import Side from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your dashboard",
};
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
