import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageShellProps {
  children: ReactNode;
  showFooter?: boolean;
  className?: string;
}

const PageShell = ({ children, showFooter = false, className = "" }: PageShellProps) => {
  return (
    <div className={`min-h-screen flex flex-col bg-background relative overflow-hidden ${className}`}>
      <div className="glow-spot w-[600px] h-[600px] bg-foreground/[0.03] -top-[200px] left-1/2 -translate-x-1/2" />
      <div className="glow-spot w-[400px] h-[400px] bg-foreground/[0.02] top-[60%] -right-[100px]" />
      <div className="glow-spot w-[300px] h-[300px] bg-foreground/[0.015] top-[40%] -left-[80px]" />

      <Navbar />
      <div className="relative z-10 flex-grow flex flex-col">{children}</div>
      {showFooter && <Footer />}
    </div>
  );
};

export default PageShell;
