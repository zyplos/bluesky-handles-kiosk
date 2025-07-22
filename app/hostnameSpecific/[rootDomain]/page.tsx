import Image from "next/image";
import { auth } from "@/internals/auth";
import type { HostnameSpecificPageProps } from "@/internals/utils";
import { PageButton } from "@/components/Button";
import {
  CenteredContent,
  FooterContent,
  HomeLayout,
} from "@/components/HomeLayout";
import { SignOutButton } from "@/components/SignOutButton";

export default async function SubdomainPage({
  params,
}: HostnameSpecificPageProps) {
  const { rootDomain } = await params;
  const session = await auth();
  const user = session?.user;

  return (
    <HomeLayout hostname={rootDomain}>
      <CenteredContent>
        <h1>home page {rootDomain}</h1>
      </CenteredContent>

      <FooterContent>
        {!user && (
          <PageButton href="/handles">Claim a Bluesky Handle</PageButton>
        )}
        {/*  */}
        {user && (
          <>
            <div className="flexRow">
              {user.image && (
                <Image
                  src={user.image}
                  alt=""
                  width={128}
                  height={128}
                  className={"profilePicture"}
                />
              )}

              {user?.username && <p className={"username"}>{user.username}</p>}

              <SignOutButton />
            </div>
            <PageButton href="/handles">Claim Handle</PageButton>
          </>
        )}
      </FooterContent>
    </HomeLayout>
  );
}
