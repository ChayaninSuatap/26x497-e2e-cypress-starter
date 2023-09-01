import { ExpenseSection } from "@/components/ExpenseSection";
import { MantineWrapper } from "@/components/MantineWrapper";
import { DB } from "@/libs/server/DB";
import { checkAuth } from "@/libs/server/checkAuth";
import { redirect } from "next/navigation";

export default function ExpensePage() {
  const username = checkAuth();
  if (!username) {
    redirect("/");
  }

  const user = DB.read().users.find((user) => user.username === username);
  if (!user) return redirect;
  const expenses = user.expenses;

  return (
    <MantineWrapper>
      <ExpenseSection expenses={expenses} />
    </MantineWrapper>
  );
}
