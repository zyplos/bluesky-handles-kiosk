import type { NextPageProps } from "@/internals/utils";
import SignInButton from "@/components/SignInButton";
import AuthErrorNotice from "@/components/AuthErrorNotice";

export default async function SignInPage({ searchParams }: NextPageProps) {
  const error = ((await searchParams).error as string | undefined) || "Default";

  return (
    <div>
      <AuthErrorNotice error={error} />
      <SignInButton />
    </div>
  );
}
