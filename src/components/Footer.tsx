
import { Link } from "react-router-dom";
import { FounderBlock, FounderLink, FoundedBy } from "@/components/FounderCredit";
import { FOUNDER_SITE_LABEL } from "@/lib/founder";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/5 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-base font-semibold text-foreground tracking-tight">
                Resume<span className="font-light opacity-70">Gen</span>
              </span>
            </Link>
            <FoundedBy className="mb-3" />
            <p className="text-sm text-foreground/35 leading-relaxed mb-4">
              Professional resumes, effortlessly built. Clean, modern, and free — a project by{" "}
              <FounderLink className="text-foreground/50 hover:text-foreground transition-colors underline-offset-2 hover:underline" />.
            </p>
            <p className="text-xs text-foreground/30">
              Visit{" "}
              <FounderLink className="text-foreground/45 hover:text-foreground transition-colors underline-offset-2 hover:underline">
                {FOUNDER_SITE_LABEL}
              </FounderLink>
              {" "}for more tools and work by the founder.
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-medium text-foreground/50 uppercase tracking-[0.2em] mb-4">Navigate</h3>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-sm text-foreground/35 hover:text-foreground transition-colors duration-300">Home</Link></li>
              <li><Link to="/builder" className="text-sm text-foreground/35 hover:text-foreground transition-colors duration-300">Builder</Link></li>
              <li><Link to="/templates" className="text-sm text-foreground/35 hover:text-foreground transition-colors duration-300">Templates</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-medium text-foreground/50 uppercase tracking-[0.2em] mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li><Link to="/builder" className="text-sm text-foreground/35 hover:text-foreground transition-colors duration-300">Resume Tips</Link></li>
              <li><Link to="/templates" className="text-sm text-foreground/35 hover:text-foreground transition-colors duration-300">Choose a Template</Link></li>
              <li>
                <FounderLink className="text-sm text-foreground/35 hover:text-foreground transition-colors duration-300">
                  {FOUNDER_SITE_LABEL}
                </FounderLink>
              </li>
            </ul>
          </div>

          <FounderBlock />
        </div>

        <div className="border-t border-foreground/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/25 text-center md:text-left">
            © {currentYear} ResumeGen · Founded by{" "}
            <FounderLink className="text-foreground/40 hover:text-foreground transition-colors underline-offset-2 hover:underline" />
            {" · "}
            <FounderLink className="text-foreground/40 hover:text-foreground transition-colors underline-offset-2 hover:underline">
              {FOUNDER_SITE_LABEL}
            </FounderLink>
          </p>
          <div className="flex gap-5">
            <FounderLink className="text-foreground/25 hover:text-foreground transition-colors duration-300" title="Ruthwik Reddy on the web">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="sr-only">Visit ruthwikreddy.live</span>
            </FounderLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
