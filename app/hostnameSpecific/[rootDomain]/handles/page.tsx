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
      <div className="textContent">
        <h1>bluesky handles?</h1>

        <p>
          this website has been set up to let you claim a bluesky handle (such
          as <span className="bold">me.{rootDomain}</span>).
        </p>

        <p>
          sign in with Discord and, if you're on the allowlist, claim a handle
          to use on Bluesky.
        </p>

        <p>
          {!user && <SignInButton />}
          {/*  */}
          {user && <PageButton href="/claim">Claim Handle</PageButton>}
        </p>
      </div>
    </MainLayout>
  );
}
