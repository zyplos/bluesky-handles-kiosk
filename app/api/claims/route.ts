"use server";

import type { ClaimData } from "@/internals/apiTypes";
import { auth } from "@/internals/auth";
import { executeQuery } from "@/internals/db";
import { isStringEmpty, rootDomains } from "@/internals/utils";
import { NextResponse, type NextRequest } from "next/server";

export interface HandleFormState {
  message: string;
  errors: string[];
}

// https://atproto.com/specs/handle#handle-identifier-syntax
const HANDLE_REGEX =
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

// https://atproto.com/specs/did#at-protocol-did-identifier-syntax
const DID_REGEX = /^did:[a-z]+:[a-zA-Z0-9._:%-]*[a-zA-Z0-9._-]$/;

export async function POST(
  req: NextRequest
): Promise<NextResponse<HandleFormState>> {
  // ===== check auth session
  // TODO kick to /?auth-timeout and show a message
  const session = await auth();
  const user = session?.user;
  if (!session || !user) {
    return NextResponse.json(
      { message: "It seems you need to sign in again.", errors: [] },
      { status: 401 }
    );
  }

  const discordId = user.id;
  if (!discordId) {
    return NextResponse.json(
      {
        message:
          "Sorry, couldn't get your Discord ID which is needed to reserve a handle.",
        errors: [],
      },
      { status: 400 }
    );
  }

  // ===== hostname and form validation
  const host = req.headers.get("host");
  if (!host) {
    return NextResponse.json(
      { message: "Sorry, couldn't process your request.", errors: [] },
      { status: 400 }
    );
  }

  const hostname = host.split(":")[0];
  if (!rootDomains.includes(hostname) && !hostname.includes("localhost")) {
    return NextResponse.json(
      {
        message: `Sorry, ${hostname} doesn't seem configured correctly to take handle claims.`,
        errors: [],
      },
      { status: 400 }
    );
  }

  const formData = await req.formData();
  const handle = formData.get("handleString")?.toString().trim();
  const did = formData.get("didString")?.toString().trim();

  console.log("formData", formData);
  console.log("HANDLE", handle);
  console.log("DID", did);

  const errors: string[] = [];

  const handleWithHostname = `${handle}.${hostname}`;
  if (
    !handle ||
    isStringEmpty(handle) ||
    handle.length >= 100 ||
    handle.includes(".") ||
    !HANDLE_REGEX.test(handleWithHostname)
  ) {
    errors.push(
      "Invalid handle. It cannot contain spaces or periods and must be less than 100 characters. It can only contain numbers, letters or dashes (-) and cannot contain unicode characters."
    );
  }

  if (
    !did ||
    isStringEmpty(did) ||
    did.length >= 300 ||
    !did.startsWith("did:") ||
    !DID_REGEX.test(did)
  ) {
    errors.push(`Invalid DID. Make sure it starts with "did:"`);
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Sorry, couldn't claim the handle you wanted.", errors },
      { status: 400 }
    );
  }

  // last checks to make typescript happy
  if (!handle || !did) {
    return NextResponse.json(
      { message: "Sorry, couldn't claim the handle you wanted.", errors },
      { status: 400 }
    );
  }

  // ===== actual database stuff

  console.log(discordId, handle, did);

  try {
    const results = await executeQuery<ClaimData>(
      `INSERT INTO 
      claims (discord_id, handle, did, hostname, date_claimed)
      VALUES ($1, $2, $3, $4, NOW())
      ON CONFLICT (discord_id) DO UPDATE SET
        handle = EXCLUDED.handle,
        did = EXCLUDED.did,
        hostname = EXCLUDED.hostname,
        date_claimed = NOW();`,
      [discordId, handle, did, hostname]
    );

    console.log(results);

    return NextResponse.json({
      message: `claimed ${handleWithHostname}`,
      errors: [],
    });
  } catch (error) {
    console.error("unexpected error trying to update claim", error);

    return NextResponse.json(
      {
        message:
          "Sorry, an unexpected error occurred trying to claim your handle.",
        errors: [],
      },
      { status: 500 }
    );
  }
}
