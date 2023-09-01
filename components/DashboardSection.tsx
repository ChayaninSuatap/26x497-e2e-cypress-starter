"use client";

import { Box, Flex, Text, Title } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import { FC } from "react";

export const DashboardSection: FC<{
  expenseCount: number;
  totalSpent: number;
}> = ({ expenseCount, totalSpent }) => {
  return (
    <Box>
      <Flex>
        <IconHome />
        <Title order={4} mb="md" ml="sm">
          Dashboard
        </Title>
      </Flex>
      <Text>
        Total Transaction : <span data-cy="expense-count">{expenseCount}</span>
      </Text>
      <Text>
        Total Expense :{" "}
        <span data-cy="total-expense">{totalSpent.toLocaleString()}</span> Bath
      </Text>
    </Box>
  );
};
