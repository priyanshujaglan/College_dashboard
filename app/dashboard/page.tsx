"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/");
      return;
    }

    const role = session.user.Role?.toLowerCase();
    if (role === "student") router.push("/dashboard/student");
    else if (role === "teacher") router.push("/dashboard/teacher");
    else if (role === "admin") router.push("/dashboard/admin");
    else router.push("/unauthorized");
  }, [session, status, router]);

  return (
    <div className="flex h-screen justify-center items-center">
      <p className="text-lg text-gray-600">Redirecting to your dashboard...</p>
    </div>
  );
}
