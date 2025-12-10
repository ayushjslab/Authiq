import Sidebar from "@/components/shared/sidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
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
