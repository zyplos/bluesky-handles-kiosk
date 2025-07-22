import { auth } from "@/internals/auth";
import { MainLayout } from "@/components/MainLayout";
import SignInButton from "@/components/SignInButton";
import { PageButton } from "@/components/Button";

interface Params {
  rootDomain: string;
}

interface PageProps {
  params: Promise<Params>;
}

export default async function HandlesAboutPage({ params }: PageProps) {
  const { rootDomain } = await params;
  const session = await auth();
  const user = session?.user;

  return (
    <MainLayout hostname={rootDomain}>
      <div className="textContent">
        <h1>claim a handle</h1>

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
