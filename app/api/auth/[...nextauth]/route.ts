import { dbConnect } from "@/utils/dbConfig";
import User from "@/utils/models/user.model";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { User as NextAuthUser } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    // 🧩 Credentials Login
    CredentialsProvider({
      name: "credentials",
      credentials: {
        CollegeId: { label: "College ID", type: "text", placeholder: "Enter College ID" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { CollegeId, password } = credentials as {
          CollegeId: string;
          password: string;
        };

        try {
          await dbConnect();
          const user = await User.findOne({ CollegeId });
          if (!user) {
            console.log("❌ User not found");
            return null;
          }

          if (user.Password !== password) {
            console.log("❌ Password mismatch");
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            CollegeId: user.CollegeId,
            Role: user.Role,
            Branch: user.Branch,
          } as NextAuthUser & {
            CollegeId: string;
            Role: string;
            Branch: string;
          };
        } catch (error) {
          console.error("⚠️ Error in credentials authorize:", error);
          return null;
        }
      },
    }),

    // 🧠 Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    // 🔹 When user signs in
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await dbConnect();

          // Check existing user
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user with default role
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              Role: "student",
            });
            console.log("🆕 New Google user created:", existingUser.email);
          } else {
            console.log("✅ Existing Google user found:", existingUser.email);
          }

          // Attach full user info for JWT callback
          user.id = existingUser._id.toString();
          user.Role = existingUser.Role;
          user.CollegeId = existingUser.CollegeId;
          user.Branch = existingUser.Branch;
          return true;
        } catch (error) {
          console.error("❌ Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },

    // 🔹 For every JWT update (sign-in + session refresh)
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || token.id;
        token.email = user.email || token.email;
        token.name = user.name || token.name;
        token.Role = (user as any).Role || token.Role || "student";
        token.CollegeId = (user as any).CollegeId || token.CollegeId;
        token.Branch = (user as any).Branch || token.Branch;
      }
      return token;
    },

    // 🔹 When session is created
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.Role = token.Role;
        session.user.CollegeId = token.CollegeId;
        session.user.Branch = token.Branch;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
