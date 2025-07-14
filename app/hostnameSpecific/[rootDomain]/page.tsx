interface Params {
  rootDomain: string;
}

interface PageProps {
  params: Promise<Params>;
}

export default async function SubdomainPage({ params }: PageProps) {
  const { rootDomain } = await params;

  return <div>home page {rootDomain}</div>;
}
