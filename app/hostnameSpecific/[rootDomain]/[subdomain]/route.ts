import { NextResponse } from "next/server";
import { executeQuery } from "@/internals/db";
import type { DidResponse } from "@/internals/apiTypes";

interface Params {
  params: Promise<ParamsData>;
}

interface ParamsData {
  rootDomain: string;
  subdomain: string;
}

export async function GET(request: Request, { params }: Params) {
  const { rootDomain, subdomain: handle } = await params;

  try {
    const didResults = await executeQuery<DidResponse>(
      `SELECT did
      FROM claims
      WHERE hostname = $1 AND handle = $2;`,
      [rootDomain, handle]
    );

    if (didResults.length === 0) {
      return NextResponse.json(
        {
          message: `no one has claimed ${handle}.${rootDomain}`,
        },
        { status: 404 }
      );
    }

    const didResponse = didResults[0];

    return new Response(didResponse.did, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("unexpected error trying to update claim", error);

    return NextResponse.json(
      {
        message:
          "Sorry, an unexpected error occurred trying to grab the did for this handle.",
      },
      { status: 500 }
    );
  }
}
