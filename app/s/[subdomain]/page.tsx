// import Link from "next/link";
// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import { protocol } from "@/internals/utils";

import styles from "@/app/page.module.css";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ subdomain: string }>;
// }): Promise<Metadata> {
//   const { subdomain } = await params;
//   const subdomainData = await getSubdomainData(subdomain);

//   if (!subdomainData) {
//     return {
//       title: rootDomain,
//     };
//   }

//   return {
//     title: `${subdomain}.${rootDomain}`,
//     description: `Subdomain page for ${subdomain}.${rootDomain}`,
//   };
// }

export default async function SubdomainPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  // const subdomainData = await getSubdomainData(subdomain);

  // if (!subdomainData) {
  //   notFound();
  // }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <Link
          href={`${protocol}://${rootDomain}`}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {rootDomain}
        </Link> */}

        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Welcome to {subdomain}
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          This is your custom subdomain page
        </p>
      </main>
    </div>
  );
}
