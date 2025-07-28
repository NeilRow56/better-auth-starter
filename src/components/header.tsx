import { SignOutButton } from "./sign-out-button";
import { ModeSwitcher } from "./mode-switcher";
import { OrganizationSwitcher } from "./organization-switcher";
import { getOrganizations } from "@/server/organizations";
import Link from "next/link";
import { Button } from "./ui/button";

export async function Header() {
  const organizations = await getOrganizations();

  return (
    <header className="absolute top-0 right-0 flex justify-between items-center p-4 w-full">
      <OrganizationSwitcher organizations={organizations} />
      <div className="flex items-center gap-2">
        <Button asChild variant="outline">
          <Link href="/">Home</Link>
        </Button>
        <SignOutButton />
        <ModeSwitcher />
      </div>
    </header>
  );
}
