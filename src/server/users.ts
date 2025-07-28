"use server";

import { db } from "@/db";
import { member, UsersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq, inArray, not } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  const currentUser = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.id, session.user.id),
  });

  if (!currentUser) {
    redirect("/auth-sign-in");
  }

  return {
    ...session,
    currentUser,
  };
};

export const getUsers = async (organizationId: string) => {
  try {
    const members = await db.query.member.findMany({
      where: eq(member.organizationId, organizationId),
    });

    const users = await db.query.UsersTable.findMany({
      where: not(
        inArray(
          UsersTable.id,
          members.map((member) => member.userId)
        )
      ),
    });

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};

export const signUp = async (email: string, password: string, name: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    return {
      success: true,
      message: "Signed up successfully.",
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "An unknown error occurred.",
    };
  }
};
