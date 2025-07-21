import type { Metadata } from "next";
import "@/styles/_variables.scss";
import "@/styles/_globals.scss";

export const metadata: Metadata = {
  title: "not configured - bluesky-handles-kiosk",
  description: "not ready to take claims yet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
