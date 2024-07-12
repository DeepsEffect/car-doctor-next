import { connectDB } from "@/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        if (!email || !password) {
          console.error("Email or password not provided");
          throw new Error("Email or password not provided");
        }

        const db = await connectDB();
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) {
          console.error("No user found with this email");
          throw new Error("No user found with this email");
        }

        const passwordMatched = await bcrypt.compare(
          password,
          currentUser.password
        );
        if (!passwordMatched) {
          console.error("Password does not match");
          throw new Error("Password does not match");
        }

        return currentUser;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { name, email, image } = user;
        try {
          const db = await connectDB();
          const userCollection = db.collection("users");
          const userExists = await userCollection.findOne({ email });
          if (!userExists) {
            // send to db
            const res = await userCollection.insertOne(user);
            return user;
          } else {
            return user;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return user;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
