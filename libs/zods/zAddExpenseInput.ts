import { z } from "zod";

export const zAddExpenseInput = z.object({
  title: z.string().nonempty({ message: "Title cannot be empty" }).trim(),
  amount: z.number().min(1, { message: "Amount must be larger than 0" }),
});

export type AddExpenseInput = z.infer<typeof zAddExpenseInput>;
