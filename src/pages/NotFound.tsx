
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageShell>
      <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-20">
        <div className="glass-card rounded-3xl p-12 md:p-16 text-center max-w-md relative overflow-hidden fade-up">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] via-transparent to-foreground/[0.02] pointer-events-none" />
          <div className="relative z-10">
            <p className="section-label mb-4">Error 404</p>
            <h1 className="text-6xl md:text-7xl font-bold text-foreground tracking-tight mb-4">
              404
            </h1>
            <p className="text-lg text-foreground/70 mb-3">
              Page not found
            </p>
            <p className="text-sm text-foreground/40 mb-8 leading-relaxed">
              The page you're looking for might have been removed, renamed, or is temporarily unavailable.
            </p>
            <Link
              to="/"
              className="btn-primary px-8 py-3.5"
            >
              Return to Home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    </PageShell>
  );
};

export default NotFound;
