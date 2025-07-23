import { auth } from "@/internals/auth";
import type { HostnameSpecificPageProps } from "@/internals/utils";
import { MainLayout } from "@/components/MainLayout";
import SignInButton from "@/components/SignInButton";
import { PageButton } from "@/components/Button";

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
          <span className="bold">{rootDomain}</span>, then sign in first to get
          started!
        </p>
      </div>

      {!user && <SignInButton />}
      {user && <PageButton href="/claim">Claim Handle</PageButton>}
    </MainLayout>
  );
}
