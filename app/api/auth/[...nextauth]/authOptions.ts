import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/app/lib/prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }: any) {
      if (!user.email) return false;

      const existingUser =
        await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
          },
        });
      }

      return true;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};