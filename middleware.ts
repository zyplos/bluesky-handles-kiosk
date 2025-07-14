import { type NextRequest, NextResponse } from "next/server";
import { rootDomains } from "@/internals/utils";

interface DomainInfo {
  subdomain: string | null;
  /** The matched root domain without port, e.g. "localhost" or "my-domain.com" */
  rootDomain: string | null;
}

function extractDomainInfo(request: NextRequest): DomainInfo {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
    const parts = hostname.split("---");
    return {
      subdomain: parts.length > 0 ? parts[0] : null,
      rootDomain: "vercel.app",
    };
  }

  for (const domain of rootDomains) {
    const rootDomainFormatted = domain.split(":")[0];
    if (hostname.endsWith(rootDomainFormatted)) {
      if (
        hostname !== rootDomainFormatted &&
        hostname !== `www.${rootDomainFormatted}`
      ) {
        const subdomain = hostname.replace(`.${rootDomainFormatted}`, "");
        return { subdomain, rootDomain: rootDomainFormatted };
      }

      return { subdomain: null, rootDomain: rootDomainFormatted };
    }
  }

  return { subdomain: null, rootDomain: null };
}

/*
  notes

  /                          | hostnameSpecific/[rootDomain]/page.ts                | show splash image with discord login somewhere
  /.well-known/atproto-did   | hostnameSpecific/[rootDomain]/[subdomain]/route.ts   | send plain text response with user's bluesky did
  /dashboard                 | dashboard/page.ts                                    | let people input their bluesky did here

*/

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { subdomain, rootDomain } = extractDomainInfo(request);

  // If the request's hostname is not in our configured rootDomains,
  // redirect it to the root path of that same hostname.
  if (!rootDomain) {
    // We add a check for `pathname !== "/"` to prevent a redirect loop.
    if (pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // If it's already at the root, let it render whatever is there.
    return NextResponse.next();
  }

  console.log("middleware", { pathname, subdomain, rootDomain });

  // --- Logic for requests with a subdomain ---
  if (subdomain) {
    // For a subdomain, both the root path and the atproto-did path
    // should resolve to the user's public DID document.
    if (pathname === "/.well-known/atproto-did") {
      return NextResponse.rewrite(
        new URL(`/hostnameSpecific/${rootDomain}/${subdomain}`, request.url)
      );
    }

    // visiting with a valid rootDomain and a subdomain should always take you to well-known
    return NextResponse.redirect(
      new URL("/.well-known/atproto-did", request.url)
    );

    // biome-ignore lint/style/noUselessElse: readability
  } else {
    // --- Logic for requests on a root domain (no subdomain) ---
    // don't let people manually go to the hostnameSpecific routes
    if (pathname.startsWith("/hostnameSpecific")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Show the splash page for the root domain.
    if (pathname === "/") {
      return NextResponse.rewrite(
        new URL(`/hostnameSpecific/${rootDomain}`, request.url)
      );
    }
  }

  // Allow all other requests to proceed without a rewrite.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|[\\w-]+\\.\\w+).*)",
  ],
};
