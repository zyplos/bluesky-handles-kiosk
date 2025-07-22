import { redirect } from "next/navigation";
import { auth } from "@/internals/auth";
import type { HostnameSpecificPageProps } from "@/internals/utils";
import { MainLayout } from "@/components/MainLayout";
import { HandleForm } from "./form";

export default async function DashboardPage({
  params,
}: HostnameSpecificPageProps) {
  const { rootDomain } = await params;
  const session = await auth();
  const user = session?.user;

  if (!session || !user) {
    return redirect("/");
  }

  return (
    <MainLayout hostname={rootDomain}>
      <h1 className="bottomSpaceMargin">claim a handle</h1>

      <HandleForm />
    </MainLayout>
  );
}
