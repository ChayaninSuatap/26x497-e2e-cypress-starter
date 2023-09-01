import { AuthLayout } from "@/components/AuthLayout";
import { MantineWrapper } from "@/components/MantineWrapper";
import { checkAuth } from "@/libs/server/checkAuth";
import { redirect } from "next/navigation";

export default function AuthLayoutServer({
  children,
}: {
  children: React.ReactNode;
}) {
  //redirect if not authened
  const username = checkAuth();
  if (!username) {
    redirect("/");
  }

  return (
    <MantineWrapper>
      <AuthLayout username={username}>{children}</AuthLayout>
    </MantineWrapper>
  );
}
