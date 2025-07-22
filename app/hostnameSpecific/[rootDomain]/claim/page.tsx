import Image from "next/image";
import { redirect } from "next/navigation";
import clsx from "clsx";
import { auth } from "@/internals/auth";
import type { HostnameSpecificPageProps } from "@/internals/utils";
import { MainLayout } from "@/components/MainLayout";
import { HandleForm } from "./form";
import { SignOutButton } from "@/components/SignOutButton";
import styles from "@/styles/Claim.module.scss";

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

      <div
        className={clsx(
          "flexRow paragraphMargin",
          styles.smallerGap,
          styles.formRow
        )}
      >
        <p>signed in as</p>{" "}
        {user.image && (
          <Image
            src={user.image}
            alt=""
            width={128}
            height={128}
            className={"profilePicture"}
          />
        )}{" "}
        {user.username}
        <SignOutButton />
      </div>

      <HandleForm />
    </MainLayout>
  );
}
