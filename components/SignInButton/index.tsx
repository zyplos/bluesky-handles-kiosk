import { signIn } from "@/internals/auth";
import { Button } from "../Button";

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord", { redirectTo: "/claim" });
      }}
    >
      <Button type="submit">Sign in with Discord</Button>
    </form>
  );
}
