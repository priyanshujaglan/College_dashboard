import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// This file extends the default NextAuth types to include your custom properties

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's database ID. */
      id: string;
      /** The user's College ID. */
      CollegeId: string;
      /** The user's role (e.g., 'student', 'staff'). */
      Role: string;
      /** The user's branch (e.g., 'CSE', 'ECE'). */
      Branch: string;
      /** The user's course. */
      course: string;
    } & DefaultSession["user"]; // This includes the default 'name', 'email', 'image'
  }

  /**
   * The shape of the `user` object returned in the `authorize` function
   */
  interface User {
    id: string;
    CollegeId: string;
    Role: string;
    Branch: string;
    course: string;
    // Add other properties from your Mongoose schema here
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback */
  interface JWT {
    /** The user's database ID. */
    id: string;
    /** The user's College ID. */
    CollegeId: string;
    /** The user's role (e.g., 'student', 'staff'). */
    Role: string;
    /** The user's branch (e.g., 'CSE', 'ECE'). */
    Branch: string;
    /** The user's course. */
    course: string;
  }
}

