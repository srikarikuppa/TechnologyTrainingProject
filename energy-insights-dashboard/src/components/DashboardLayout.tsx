import { ReactNode } from "react";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-indigo-100 bg-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>© 2026 Smart Energy Analytics</p>
          <p className="mt-1 text-xs text-slate-400">Powered by ML-driven insights</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
