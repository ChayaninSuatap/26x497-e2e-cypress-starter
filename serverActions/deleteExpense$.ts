"use server";

import { DB } from "@/libs/server/DB";
import { checkAuth } from "@/libs/server/checkAuth";
import { revalidatePath } from "next/cache";

export async function deleteExpense$(expenseId: string) {
  //check authen
  const username = checkAuth();
  if (!username)
    return { ok: false, message: "Unauthorized. Please login again." };

  //find data
  const db = DB.read();
  const user = db.users.find((user) => user.username === username);
  if (!user) return { ok: false, message: "User does not exist" };
  const expense = user.expenses.find((expense) => expense.id === expenseId);
  if (!expense) return { ok: false, message: "Expense does not exist" };

  //delete data
  user.expenses = user.expenses.filter((expense) => expense.id !== expenseId);
  DB.write(db);

  //refetch expenses
  revalidatePath("/expense");

  return { ok: true };
}
