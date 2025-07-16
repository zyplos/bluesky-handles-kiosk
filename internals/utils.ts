export const protocol =
  process.env.NODE_ENV === "production" ? "https" : "http";

export const rootDomains = process.env.HOSTNAMES?.split(" ") || [
  "localhost:3000",
];

export function isStringEmpty(str: string) {
  return !str || /^\s*$/.test(str);
}
