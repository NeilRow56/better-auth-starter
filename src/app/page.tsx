import { HomeView } from "@/components/home-view";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/sign-in");
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-6xl font-bold">Garage 4</h1>
        <HomeView />
      </div>
    </div>
  );
}
