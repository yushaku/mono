import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, register } from "@/services/auth";
import { UserAuth } from "types";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password, name } = credentials as any;

        let user: UserAuth;

        name
          ? (user = await register({
              name,
              email,
              password,
            }))
          : (user = await login({
              email,
              password,
            }));

        if (user) return user as any;
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return {
        ...user,
        ...token,
      };
    },

    async session({ session, token }) {
      const { data, ...res } = token;
      return { ...res, ...session, user: data } as Session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
