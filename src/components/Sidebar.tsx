import Link from "next/link";
import { Button } from "./ui/button";
import { ChartArea, Plus, Smile, LucideLogOut } from "lucide-react";
import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Side() {
  const { getUser } = getKindeServerSession();
  const username = await getUser();
  return (
    <aside className="  fixed w-1/5 h-screen  bg-zinc-50 shadow-xl rounded-2xl p-4 grid grid-rows-3 place-items-center  ">
      <div className="place-self-start">
        <Link href="/">
          <h2 className="text-blue-400 p-1 text-lg md:text-xl ">
            Fru<span className="text-gray-500">gal</span>
          </h2>
        </Link>
        <div className="flex justify-start items-center w-full gap-1">
          <Smile height={20} className="stroke-green-400" />
          <p className="text-gray-500">{username?.given_name}</p>
        </div>
      </div>
      <div className="grid grid-rows-2 gap-1">
        <Button
          variant="default"
          className="flex items-center justify-center p-4 w-full  "
        >
          <Link href="/dashboard/your_budgets">Your budgets</Link>
          <span>
            <ChartArea />
          </span>
        </Button>
        <Button
          variant="default"
          className="flex items-center justify-center p-4 w-full  "
        >
          <Link href="/dashboard/create">Set budget</Link>
          <span>
            <Plus />
          </span>
        </Button>
      </div>
      <Button variant="secondary">
        <LogoutLink className="flex items-center justify-center gap-2">
          <p>Sign Out</p>
          <span>
            <LucideLogOut />
          </span>
        </LogoutLink>
      </Button>
    </aside>
  );
}
