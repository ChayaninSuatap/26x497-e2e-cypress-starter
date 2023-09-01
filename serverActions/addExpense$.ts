"use server";

import { DB } from "@/libs/server/DB";
import { checkAuth } from "@/libs/server/checkAuth";
import {
  AddExpenseInput,
  zAddExpenseInput,
} from "@/libs/zods/zAddExpenseInput";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

export async function addExpense$(input: AddExpenseInput) {
  //check authen
  const username = checkAuth();
  if (!username)
    return { ok: false, message: "Unauthorized. Please login again." };

  //validate input
  const parsed = zAddExpenseInput.safeParse(input);
  if (!parsed.success) return { ok: false, message: "Invalid input" };
  const { title, amount } = parsed.data;

  //try to write data
  const db = DB.read();
  const user = db.users.find((user) => user.username === username);
  if (!user) return { ok: false, message: "User does not exist" };

  //success
  user.expenses.push({ title, amount, id: nanoid() });
  DB.write(db);

  //refetch
  revalidatePath("/expense");

  return { ok: true };
}
