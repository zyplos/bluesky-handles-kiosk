import Image from "next/image";
import type { Metadata } from "next";
import { auth } from "@/internals/auth";
import { rootDomains, type HostnameSpecificPageProps } from "@/internals/utils";
import { PageButton } from "@/components/Button";
import {
  CenteredContent,
  FooterContent,
  HomeLayout,
} from "@/components/HomeLayout";
import { SignOutButton } from "@/components/SignOutButton";
import HostnameLandingContent from "@/components/HostnameLandingContent";
import Alert from "@/components/Alert";

export async function generateMetadata({
  params,
}: HostnameSpecificPageProps): Promise<Metadata> {
  const rootDomain = (await params).rootDomain;

  return {
    title: `@${rootDomain}`,
  };
}

export default async function SubdomainPage({
  params,
}: HostnameSpecificPageProps) {
  const { rootDomain } = await params;
  const session = await auth();
  const user = session?.user;

  return (
    <HomeLayout hostname={rootDomain}>
      <CenteredContent>
        {!rootDomains.includes(rootDomain) && (
          <Alert variant="info" className="bottomSpaceMargin">
            <span className="bold">{rootDomain}</span> is not in env.rootDomains
          </Alert>
        )}
        <HostnameLandingContent rootDomain={rootDomain} />
      </CenteredContent>

      <FooterContent>
        {!user && (
          <PageButton href="/handles" style={{ marginLeft: "auto" }}>
            Claim a Bluesky Handle
          </PageButton>
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
