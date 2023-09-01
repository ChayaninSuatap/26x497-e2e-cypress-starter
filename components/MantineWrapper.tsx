"use client";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { FC, ReactNode } from "react";

export const MantineWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Notifications />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
};
