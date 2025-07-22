import { auth } from "@/internals/auth";
import { redirect } from "next/navigation";
import { HandleForm } from "./form";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    return redirect("/");
  }

  return (
    <div>
      <h1>dash bord</h1>

      <HandleForm />
    </div>
  );
}
