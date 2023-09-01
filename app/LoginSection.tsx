"use client";
import { login$ } from "@/serverActions/login$";
import {
  Button,
  Container,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { FC, useState, useTransition } from "react";

type Form = {
  username: string;
  password: string;
};

export const LoginSection: FC = () => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const form = useForm<Form>({
    initialValues: {
      username: "",
      password: "",
    },
  });

  function callLogin() {
    startTransition(async () => {
      const result = await login$(form.values.username, form.values.password);
      if (!result.ok) setErrorMessage(result.message as string);
      else router.push("/dashboard");
    });
  }

  return (
    <Container size="xs">
      <form onSubmit={form.onSubmit(callLogin)}>
        <Stack>
          <Title>Budget App</Title>
          <TextInput
            label="username"
            {...form.getInputProps("username")}
            required
            name="usernameInput"
          />
          <TextInput
            label="password"
            {...form.getInputProps("password")}
            type="password"
            required
            name="passwordInput"
          />
          {errorMessage && (
            <Text align="center" color="red">
              {errorMessage}
            </Text>
          )}
          <Button type="submit">Log in</Button>
        </Stack>
      </form>
    </Container>
  );
};
