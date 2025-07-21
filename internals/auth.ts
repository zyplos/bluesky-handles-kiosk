import NextAuth, { type DefaultSession } from "next-auth";
import Discord, { type DiscordProfile } from "next-auth/providers/discord";
//
// NOTE: want to let anyone sign in to make a handle claim? scroll to the bottom of this file
//
// import ALLOWLIST from "./ALLOWLIST";

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
  pages: {
    signIn: "/auth/signin",
    error: "/auth/failed",
  },
  callbacks: {
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
    // i am a comment
    // if you would like to let anyone sign in to claim a handle, comment all the code BELOW out
    // signIn({ profile }) {
    //   if (!profile?.id) {
    //     console.error(
    //       "internals/auth.ts signIn(): sign in user doesn't have an id for some reason?? didn't log them in",
    //       profile
    //     );
    //     return false;
    //   }

    //   return ALLOWLIST.includes(profile.id);
    // },
    // if you would like to let anyone sign in to claim a handle, comment all the code ABOVE out
  },
});
