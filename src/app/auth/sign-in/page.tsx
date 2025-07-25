import { auth } from "@/lib/auth";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignInForm } from "./_components/sign-in-form";

const SigninPage = async () => {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!!session) redirect("/");
  return <SignInForm />;
};

export default SigninPage;
