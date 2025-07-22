import { signOut } from "@/internals/auth";
import { Button } from "../Button";
import styles from "./styles.module.scss";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className={styles.small}>
        Sign Out
      </Button>
    </form>
  );
}
