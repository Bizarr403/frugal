"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, ChartNoAxesColumn } from "lucide-react";
import {
  RegisterLink,
  LoginLink,
  useKindeAuth,
} from "@kinde-oss/kinde-auth-nextjs";

export default function Nav() {
  const { isAuthenticated } = useKindeAuth();
  return (
    <nav className=" bg-zinc-100 flex justify-center w-full h-fit p-2">
      <div className="bg-zinc-50 rounded-full h-fit p-2 flex items-center text-center md:justify-between w-3/4">
        <Link href="/">
          <h2 className="text-blue-400 p-1 text-lg md:text-xl ">
            Fru<span className="text-gray-500">gal</span>
          </h2>
        </Link>
        <div className="flex   justify-evenly items-center w-full  p-4 text-gray-800">
          <Button variant="link">
            <Link href="/">About</Link>
          </Button>
          <Button variant="link">
            <Link href="/">Mission</Link>
          </Button>
        </div>
        <div className=" flex justify-center items-center w-full gap-2">
          <Button variant="secondary" size="sm">
            <LoginLink>Sign in</LoginLink>
          </Button>
          {isAuthenticated ? (
            <Button
              className="flex items-center shadow-sm justify-center w-fit"
              size="sm"
            >
              <Link href="/dashboard">Dashboard</Link>
              <span>
                <ChartNoAxesColumn className="h-1 w-1" />
              </span>
            </Button>
          ) : (
            <Button
              className="flex items-center shadow-sm justify-center w-fit"
              size="sm"
            >
              <RegisterLink>Start Saving</RegisterLink>
              <span>
                <ArrowRight className="h-1 w-1" />
              </span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
