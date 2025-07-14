import { type NextRequest, NextResponse } from "next/server";
import { rootDomains } from "@/internals/utils";

interface DomainInfo {
  subdomain: string | null;
  rootDomain: string | null;
}

/**
 * Extracts the subdomain and the root domain from a request.
 * It supports multiple root domains, Vercel preview URLs, and localhost.
 *
 * @param {NextRequest} request - The incoming Next.js request.
 * @returns {DomainInfo} An object containing the subdomain and the matched root domain.
 */
function extractDomainInfo(request: NextRequest): DomainInfo {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // Handle Vercel preview deployments (e.g., "tenant1---my-branch.vercel.app")
  if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
    const parts = hostname.split("---");
    return {
      subdomain: parts.length > 0 ? parts[0] : null,
      rootDomain: "vercel.app",
    };
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
      return { subdomain, rootDomain: rootDomainFormatted };
    }
  }

  return { subdomain: null, rootDomain: null };
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { subdomain, rootDomain } = extractDomainInfo(request);

  console.log("middleware", { pathname, subdomain, rootDomain });

  if (subdomain && rootDomain) {
    // Block access to /admin page from any subdomain
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Rewrite root path on a subdomain to the dynamic subdomain and rootDomain page
    if (pathname === "/") {
      return NextResponse.rewrite(
        new URL(`/s/${rootDomain}/${subdomain}`, request.url)
      );
    }
  }

  // Allow all other requests on the root domains to proceed
  return NextResponse.next();
}
