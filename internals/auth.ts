import NextAuth, { type DefaultSession } from "next-auth";
import Discord, { type DiscordProfile } from "next-auth/providers/discord";

// https://authjs.dev/getting-started/typescript
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username: DiscordProfile["username"];
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord],
  callbacks: {
    // stuff that matters is in "profile" NOT user
    jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id;
        token.username = profile.username;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      return session;
    },
  },
});
