import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const session = await getServerSession({
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        name: "Sign in",
        credentials: {
          email: {
            label: "Email",
            type: "email",
            placeholder: "example@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const user = { id: "1", name: "Admin", email: "admin@admin.com" };
          return user;
        },
      }),
    ],
  });

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
