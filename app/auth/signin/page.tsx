import type { NextPageProps } from "@/internals/utils";
import SignInButton from "@/components/SignInButton";
import AuthErrorNotice from "@/components/AuthErrorNotice";
import { MainLayout } from "@/components/MainLayout";

export default async function SignInPage({ searchParams }: NextPageProps) {
  const error = (await searchParams).error as string | undefined;

  return (
    <MainLayout hostname="">
      <div className="textContent bottomSpaceMargin">
        <h1>Sign In</h1>
        <p>
          To prevent automated abuse, we ask that you sign in to claim a handle.
        </p>
        {error && <AuthErrorNotice error={error} />}
      </div>

      <SignInButton />
    </MainLayout>
  );
}
