import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://cdn.discordapp.com/avatars/**")],
  },
  sassOptions: {
    prependData: `
        @use "@/styles/_common.scss" as common;
      `,
  },
};

export default nextConfig;
