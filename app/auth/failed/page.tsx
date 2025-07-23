import type { NextPageProps } from "@/internals/utils";
import AuthErrorNotice from "@/components/AuthErrorNotice";
import { MainLayout } from "@/components/MainLayout";
import { PageButton } from "@/components/Button";

export default async function AuthErrorPage({ searchParams }: NextPageProps) {
  const error = ((await searchParams).error as string | undefined) || "Default";

  return (
    <MainLayout hostname="">
      <div className="textContent">
        <h1>oops</h1>
        <AuthErrorNotice error={error} />

        <p>
          <PageButton href="/">Home</PageButton>
        </p>
      </div>
    </MainLayout>
  );
}
