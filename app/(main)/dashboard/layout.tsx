"use client"
import Sidebar from "@/components/shared/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const {data: session, status} = useSession();

  const router = useRouter();

  if(!session?.user){
    router.push("/login")
  }

if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground animate-pulse">
          Loading....
        </span>
      </div>
    );
  }
  return (
    <div>
      <Sidebar />
      <div className="ml-22">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
