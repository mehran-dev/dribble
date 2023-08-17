import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 7000,
      },
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET!,

    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;
      try {
        const data = (await getUser(email)) as { user?: UserProfile };
        console.log("data =====>", data);

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data.user,
          },
        };
        console.log("newSessionn ===========>", newSession);

        return newSession;
      } catch (error) {
        console.log("Error retrieving user data ", error);
        return session;
      }
    },
    async signIn({ user }: { user: any | User }) {
      try {
        const userExists = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };

        if (!userExists) {
          await createUser(user?.name, user?.email, user?.image);
        }

        return true;
      } catch (error: any) {
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
}
