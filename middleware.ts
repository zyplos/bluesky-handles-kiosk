import { type NextRequest, NextResponse } from "next/server";
import { rootDomains } from "@/internals/utils";

/**
 * Extracts the subdomain from a request.
 * It supports multiple root domains, Vercel preview URLs, and localhost.
 *
 * @param {NextRequest} request - The incoming Next.js request.
 * @returns {string | null} The extracted subdomain or null if not found.
 */
function extractSubdomain(request: NextRequest): string | null {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // Handle Vercel preview deployments (e.g., "tenant1---my-branch.vercel.app")
  if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
    const parts = hostname.split("---");
    return parts.length > 0 ? parts[0] : null;
  }

  // Find the matching root domain from our list
  const matchingRootDomain = rootDomains.find((domain) => {
    const formattedDomain = domain.split(":")[0];
    return hostname.endsWith(formattedDomain);
  });

  if (matchingRootDomain) {
    const rootDomainFormatted = matchingRootDomain.split(":")[0];

    // Ensure it's a true subdomain and not the root domain itself (or www)
    if (
      hostname !== rootDomainFormatted &&
      hostname !== `www.${rootDomainFormatted}`
    ) {
      const subdomain = hostname.replace(`.${rootDomainFormatted}`, "");
      return subdomain;
    }
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  console.log("middleware", { pathname, subdomain });

  if (subdomain) {
    // Block access to /admin page from any subdomain
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Rewrite root path on a subdomain to the dynamic subdomain page
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
    }
  }

  // Allow all other requests on the root domains to proceed
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
