import Link from "next/link";
import type { NextPageProps } from "@/internals/utils";
import AuthErrorNotice from "@/components/AuthErrorNotice";

export default async function AuthErrorPage({ searchParams }: NextPageProps) {
  const error = ((await searchParams).error as string | undefined) || "Default";

  return (
    <div>
      <h1>oops</h1>
      <div>
        <AuthErrorNotice error={error} />
      </div>

      <Link href="/">home</Link>
    </div>
  );
}
