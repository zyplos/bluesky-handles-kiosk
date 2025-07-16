interface Params {
  params: Promise<ParamsData>;
}

interface ParamsData {
  rootDomain: string;
  subdomain: string;
}

export async function GET(request: Request, { params }: Params) {
  const { rootDomain, subdomain } = await params;

  return new Response(`Welcome to ${subdomain}.${rootDomain}`, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
