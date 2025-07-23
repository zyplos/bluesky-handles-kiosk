import Image from "next/image";
import type { Metadata } from "next";
import type { HostnameSpecificPageProps } from "@/internals/utils";
import { auth } from "@/internals/auth";
import { MainLayout } from "@/components/MainLayout";
import SignInButton from "@/components/SignInButton";
import { PageButton } from "@/components/Button";
import handleDialogImg from "../claim/handle-dialog.png";

export async function generateMetadata({
  params,
}: HostnameSpecificPageProps): Promise<Metadata> {
  const rootDomain = (await params).rootDomain;

  return {
    title: `Handles - @${rootDomain}`,
  };
}

export default async function HandlesAboutPage({
  params,
}: HostnameSpecificPageProps) {
  const { rootDomain } = await params;
  const session = await auth();
  const user = session?.user;

  return (
    <MainLayout hostname={rootDomain}>
      <div className="textContent bottomSpaceMargin">
        <h1>Bluesky handles?</h1>

        <p>
          This website has been set up to let you claim a custom Bluesky
          username (such as <span className="bold">me.{rootDomain}</span>).
        </p>

        <p>
          To prevent automated abuse, you must sign in with Discord to claim a
          handle. If you'd like a Bluesky username that ends in{" "}
          <span className="bold">{rootDomain}</span>, then sign in to get
          started!
        </p>
      </div>

      <div className="paragraphMargin">
        {!user && <SignInButton />}
        {user && <PageButton href="/claim">Claim Handle</PageButton>}
      </div>

      <p className="bottomSpaceMargin">
        You can find this on the Bluesky site by going to{" "}
        <a
          href="https://bsky.app/settings/account"
          target="_blank"
          rel="noopener"
        >
          Settings {">"} Account {">"} Handle {">"} "I have my own domain" {">"}{" "}
          No DNS Panel
        </a>
      </p>
      <Image
        src={handleDialogImg}
        alt={`A dialog titled "Change Handle" on the Bluesky site`}
        className="fluidImg"
      />
    </MainLayout>
  );
}
