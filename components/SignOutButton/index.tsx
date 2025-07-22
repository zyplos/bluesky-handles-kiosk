import { signOut } from "@/internals/auth";
import { Button } from "../Button";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" outlined small>
        Sign Out
      </Button>
    </form>
  );
}
