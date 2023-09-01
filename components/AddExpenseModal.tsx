import { zAddExpenseInput } from "@/libs/zods/zAddExpenseInput";
import { addExpense$ } from "@/serverActions/addExpense$";
import {
  Button,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState, useTransition } from "react";

type Form = {
  title: string;
  amount: number;
};

type Props = {
  opened: boolean;
  close: () => void;
};

export function AddExpenseModal(props: Props) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<Form>({
    initialValues: {
      title: "",
      amount: 0,
    },
    validate: zodResolver(zAddExpenseInput),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>();

  async function callAddExpense() {
    startTransition(async () => {
      const result = await addExpense$({ ...form.values });
      if (!result.ok) {
        setErrorMessage(result.message);
        return;
      }
      form.reset();
      props.close();
    });
  }

  return (
    <Modal
      opened={props.opened}
      onClose={() => props.close()}
      title="Add Expense"
    >
      <form onSubmit={form.onSubmit(() => callAddExpense())}>
        <Stack>
          <TextInput
            label="Expense Title"
            {...form.getInputProps("title")}
            data-autofocus
            data-cy="expense-title-input"
          />
          <NumberInput
            label="Amount"
            {...form.getInputProps("amount")}
            data-cy="expense-amount-input"
            type="number"
          />
          {errorMessage && <Text color="red">{errorMessage}</Text>}
          <Button type="submit" data-cy="add-expense-button">
            Add Expense
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
