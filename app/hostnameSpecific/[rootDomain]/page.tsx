import SignInButton from "@/components/SignInButton";
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
  console.log(session);
  const user = session?.user;

  return (
    <div>
      <h1>home page {rootDomain}</h1>

      {!user && <SignInButton />}

      {user && <SignOutButton />}

      {user?.name && <p>you: {user.name}</p>}
      {user?.id && <p>id: {user.id}</p>}
      {user?.username && <p>username: {user.username}</p>}

      {user?.image && (
        <p>
          <Image src={user.image} alt="" width={64} height={64} />
        </p>
      )}
    </div>
  );
}
