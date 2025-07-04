import { HeroChart } from "@/components/Charts/Charts";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe2, ChartLine, Percent } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Home() {
  return (
    <div className="bg-zinc-100 w-full h-full ">
      <article className="grid grid-rows-1 md:grid-rows-2 gap-4 place-items-center p-4">
        <section className="w-[50vw]">
          <h1 className="text-3xl text-center">
            TAKING THE NEXT STEP IN
            <span className="font-bold text-blue-400"> MANAGING</span> AND
            <span className="font-bold text-blue-400"> BUDGETING</span> YOUR
            FINANCES
          </h1>
          <h2 className="text-lg text-center">
            Smarter management, better budgeting, discover better ways to manage
            your income and expenses
          </h2>
          <div className="grid grid-rows-2 place-items-center mt-2">
            <Button className="z-10">
              Get Started Saving <ArrowRight />
            </Button>
            <p className="text-sm text-gray-400 flex items-center gap-1">
              2000+ users
              <Globe2 className="stroke-green-400" />
            </p>
          </div>
        </section>

        <HeroChart />
      </article>
      <article className="bg-zinc-800 w-full block gap-1   place-items-center p-4">
        <h1 className="text-4xl text-center mb-4 text-white">Features</h1>
        <div className=" grid md:grid-cols-2   gap-16">
          <Card className="bg-zinc-500/30 backdrop-blur-md border-transparent shadow-sm shadow-zinc-700  grid grid-rows-3 place-items-center text-white h-full w-full mt-2 p-4">
            <CardHeader className="flex justify-center items-center ">
              <CardTitle className="text-2xl text-center text-nowrap font-semibold text-white">
                Visual Representation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartLine className="h-8 w-8" />
            </CardContent>
            <CardDescription className="text-center">
              Frugal provides visual aids to allow users see and track their
              finances.
            </CardDescription>
          </Card>
          <Card className="bg-zinc-500/30 backdrop-blur-md border-transparent shadow-sm shadow-zinc-700 grid grid-rows-3 place-items-center text-white h-full w-full mt-2 p-4">
            <CardHeader className="flex justify-center items-center">
              <CardTitle className="text-2xl text-nowrap text-center font-semibold">
                Easy Customization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Percent className="h-8 w-8" />
            </CardContent>
            <CardDescription className="text-center">
              Frugal allows customizable categories and percentages allowing
              intricate tracking of finances
            </CardDescription>
          </Card>
        </div>
      </article>
    </div>
  );
}
