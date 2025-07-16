import { signIn } from "@/internals/auth";

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord", { redirectTo: "/dashboard" });
      }}
    >
      <button type="submit">Sign in with Discord</button>
    </form>
  );
}
