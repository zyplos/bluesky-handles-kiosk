import { PageButton } from "@/components/Button";
import {
  CenteredContent,
  FooterContent,
  HomeLayout,
} from "@/components/HomeLayout";
import { SignOutButton } from "@/components/SignOutButton";
import { auth } from "@/internals/auth";
import Image from "next/image";

interface Params {
  rootDomain: string;
}

interface PageProps {
  params: Promise<Params>;
}

export default async function SubdomainPage({ params }: PageProps) {
  const { rootDomain } = await params;
  const session = await auth();
  const user = session?.user;

  return (
    <HomeLayout>
      <CenteredContent>
        <h1>home page {rootDomain}</h1>
      </CenteredContent>

      <FooterContent>
        {!user && <PageButton href="/about">Claim a Bluesky Handle</PageButton>}
        {/*  */}
        {user && (
          <>
            <div>
              {user?.username && <p>{user.username}</p>}
              {user.image && (
                <Image src={user.image} alt="" width={64} height={64} />
              )}
              <SignOutButton />
            </div>
            <PageButton href="/claim">Claim Handle</PageButton>
          </>
        )}
      </FooterContent>
    </HomeLayout>
  );
}
