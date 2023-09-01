"use client";

import { Expense } from "@/libs/server/DB";
import { deleteExpense$ } from "@/serverActions/deleteExpense$";
import { Box, Button, Flex, Table, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCoin, IconTrash } from "@tabler/icons-react";
import { FC, useTransition } from "react";
import { AddExpenseModal } from "./AddExpenseModal";

type Props = {
  expenses: Expense[];
};

export const ExpenseSection: FC<Props> = ({ expenses }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isPending, startTransition] = useTransition();

  function callDeleteExpense(expenseId: string) {
    if (confirm("Do you want to delete expense?")) {
      startTransition(async () => {
        const result = await deleteExpense$(expenseId);
        if (!result.ok) {
          notifications.show({
            color: "red",
            title: "Failed",
            message: result.message,
          });
          return;
        }
        notifications.show({
          color: "green",
          title: "Success",
          message: "Expense is deleted",
        });
      });
    }
  }

  return (
    <Box>
      <Flex>
        <IconCoin />
        <Title order={4} mb="md" ml="sm">
          Expenses (<span data-cy="expense-count">{expenses.length}</span>)
        </Title>
      </Flex>

      <Table mb="md" data-cy="expenses-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td data-cy="expense-title">{expense.title}</td>
              <td data-cy="expense-amount">
                {expense.amount.toLocaleString()}
              </td>
              <td>
                <Button
                  color="red"
                  variant="outline"
                  onClick={() => callDeleteExpense(expense.id)}
                  data-cy="delete-button"
                >
                  <IconTrash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={open} variant="outline">
        Add Expense
      </Button>
      <AddExpenseModal opened={opened} close={() => close()} />
    </Box>
  );
};
