
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinkClass = (active: boolean) =>
  cn(
    "link-reveal text-[13px] transition-colors duration-300",
    active ? "text-foreground" : "text-foreground/50 hover:text-foreground"
  );

const mobileLinkClass = (active: boolean) =>
  cn(
    "transition-colors py-2 text-sm",
    active ? "text-foreground" : "text-foreground/50 hover:text-foreground"
  );

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
      <nav
        className={`w-full max-w-4xl glass-strong rounded-2xl transition-all duration-500 ${
          scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : ""
        }`}
      >
        <div className="px-6 h-14 flex items-center justify-between">
          <Link to="/" className="text-foreground text-base font-semibold tracking-tight">
            Resume<span className="font-light opacity-70">Gen</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <Link to="/" className={navLinkClass(pathname === "/")}>
              Home
            </Link>
            <Link to="/builder" className={navLinkClass(pathname === "/builder")}>
              Builder
            </Link>
            <Link to="/templates" className={navLinkClass(pathname === "/templates")}>
              Templates
            </Link>
            <Link
              to="/builder"
              className="text-[13px] bg-foreground text-background px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden text-foreground/70 hover:text-foreground p-1.5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-foreground/5 px-6 py-5 flex flex-col gap-3 animate-fade-in">
            <Link to="/" className={mobileLinkClass(pathname === "/")} onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/builder" className={mobileLinkClass(pathname === "/builder")} onClick={() => setIsMenuOpen(false)}>Builder</Link>
            <Link to="/templates" className={mobileLinkClass(pathname === "/templates")} onClick={() => setIsMenuOpen(false)}>Templates</Link>
            <Link to="/builder" className="bg-foreground text-background text-center py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all mt-1" onClick={() => setIsMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
