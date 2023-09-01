"use client";

import { logout$ } from "@/serverActions/logout$";
import {
  Box,
  Button,
  Container,
  Flex,
  NavLink,
  Text,
  Title,
} from "@mantine/core";
import { IconCoin, IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useTransition } from "react";

export const AuthLayout: FC<{ username: string; children: ReactNode }> = ({
  username,
  children,
}) => {
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();

  function callLogout() {
    startTransition(async () => {
      await logout$();
    });
  }

  return (
    <Container size="sm">
      <Title p="md">Budget App</Title>
      <Flex>
        <Box w={160} p="md">
          <Text align="center" size="xl" fw="bold" my="xs">
            Hi {username} !
          </Text>
          <Link href="/dashboard" passHref>
            <NavLink
              icon={<IconHome />}
              label="Dashboard"
              active={pathname === "/dashboard"}
            />
          </Link>
          <Link href="/expense" passHref>
            <NavLink
              icon={<IconCoin />}
              label="Expenses"
              active={pathname === "/expense"}
            />
          </Link>
          <Button
            color="gray"
            variant="outline"
            onClick={() => callLogout()}
            mt="md"
            fullWidth
          >
            Logout
          </Button>
        </Box>
        <Box p="md">{children}</Box>
      </Flex>
    </Container>
  );
};
