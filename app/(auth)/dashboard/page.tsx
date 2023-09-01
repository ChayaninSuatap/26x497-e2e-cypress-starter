import { DashboardSection } from "@/components/DashboardSection";
import { MantineWrapper } from "@/components/MantineWrapper";
import { DB } from "@/libs/server/DB";
import { checkAuth } from "@/libs/server/checkAuth";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const username = checkAuth();
  if (!username) {
    redirect("/");
  }

  const user = DB.read().users.find((user) => user.username === username);
  if (!user) return redirect;
  const expenseCount = user.expenses.length;
  const totalSpent = user.expenses.reduce<number>(
    (previous, current) => previous + current.amount,
    0
  );

  return (
    <MantineWrapper>
      <DashboardSection expenseCount={expenseCount} totalSpent={totalSpent} />
    </MantineWrapper>
  );
}
