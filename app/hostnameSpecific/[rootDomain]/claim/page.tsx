import Image from "next/image";
import { redirect } from "next/navigation";
import clsx from "clsx";

import type { HostnameSpecificPageProps } from "@/internals/utils";
import type { ClaimData } from "@/internals/apiTypes";
import { auth } from "@/internals/auth";
import { executeQuery } from "@/internals/db";
import { HandleForm } from "./form";

import { MainLayout } from "@/components/MainLayout";
import { SignOutButton } from "@/components/SignOutButton";

import styles from "@/styles/Claim.module.scss";
import handleDialogImg from "./handle-dialog.png";

export default async function DashboardPage({
  params,
}: HostnameSpecificPageProps) {
  const { rootDomain } = await params;
  const session = await auth();
  const user = session?.user;

  if (!session || !user) {
    return redirect("/");
  }

  if (!user.id) {
    return redirect("/auth/signin?error=NoId");
  }

  let claimData: ClaimData | null = null;
  try {
    // returns [] on success
    const results = await executeQuery<ClaimData>(
      `SELECT 
        discord_id,
        handle,
        did,
        hostname,
        date_claimed
      FROM claims WHERE discord_id=$1 AND hostname=$2`,
      [user.id, rootDomain]
    );

    if (results.length > 0) {
      claimData = results[0];
    }
  } catch (error) {
    console.error(
      "unexpected error grabbing current user's existing claim",
      error
    );
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

      <HandleForm rootDomain={rootDomain} claimData={claimData} />

      <div className="textContent">
        <h2>how do i use my claimed handle?</h2>
        <p>
          you'll need to go to Bluesky and go to{" "}
          <a
            href="https://bsky.app/settings/account"
            target="_blank"
            rel="noopener"
          >
            Settings {">"} Account {">"} Handle {">"} "I have my own domain"{" "}
            {">"} No DNS Panel
          </a>
          . You'll see a dialog that looks like this:
        </p>

        <p>
          <Image
            src={handleDialogImg}
            alt={`A dialog titled "Change Handle" on the Bluesky site"`}
            className="fluidImg"
          />
        </p>

        <p>
          In the "Enter the domain you want to use" textbox, enter{" "}
          <span className="bold">
            {claimData?.handle || "<your handle>"}.{rootDomain}
          </span>{" "}
          and click "Verify Text File" for Bluesky to verify that you have
          claimed the domain with your did.
        </p>
      </div>
    </MainLayout>
  );
}
