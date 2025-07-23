import type { Metadata } from "next";
import type { NextPageProps } from "@/internals/utils";
import Alert from "@/components/Alert";
import AuthErrorNotice from "@/components/AuthErrorNotice";
import { MainLayout } from "@/components/MainLayout";
import { PageButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Couldn't sign in",
};

export default async function AuthErrorPage({ searchParams }: NextPageProps) {
  const error = ((await searchParams).error as string | undefined) || "Default";

  return (
    <MainLayout hostname="">
      <div className="textContent">
        <h1>oops</h1>

        <Alert variant="danger">
          <AuthErrorNotice error={error} />
        </Alert>

        <p>
          <PageButton href="/">Home</PageButton>
        </p>
      </div>
    </MainLayout>
  );
}
