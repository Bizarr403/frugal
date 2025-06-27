import { FilteredCharts } from "@/components/Charts/Charts";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const { getUser } = getKindeServerSession();
const username = await getUser();
export default function CreatedBudgets() {
  return <FilteredCharts userID={username?.id} />;
}
