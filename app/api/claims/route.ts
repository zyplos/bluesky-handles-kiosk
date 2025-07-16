"use server";

import { isStringEmpty } from "@/internals/utils";
import { NextResponse, type NextRequest } from "next/server";

export interface HandleFormState {
  message: string;
  errors: string[];
}

const HANDLE_REGEX =
  /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const handle = formData.get("handleString")?.toString().trim();
  const did = formData.get("didString")?.toString().trim();

  console.log("formData", formData);
  console.log("HANDLE", handle);
  console.log("DID", did);

  const errors: string[] = [];

  if (
    !handle ||
    // handle.includes(".") ||
    // !HANDLE_REGEX.test(handle) ||
    handle.length >= 100
  ) {
    errors.push(
      "Invalid handle. It cannot contain spaces or periods and must be less than 100 characters. It can only contain numbers, letters or dashes (-) and cannot contain unicode characters."
    );
  }

  if (!did || !did.startsWith("did:") || isStringEmpty(did)) {
    errors.push(`Invalid DID. Make sure it starts with "did:"`);
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { message: "Sorry, couldn't claim the handle you wanted.", errors },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: `claimed ${handle}`, errors: [] });
}
