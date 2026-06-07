import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { FOUNDER_NAME, FOUNDER_URL, FOUNDER_SITE_LABEL, founderLinkProps } from "@/lib/founder";

type FounderLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string;
};

/** Link to ruthwikreddy.live */
export const FounderLink = ({ className, children, title, ...props }: FounderLinkProps) => (
  <a
    {...founderLinkProps}
    {...props}
    className={className}
    title={title ?? `${FOUNDER_NAME} — ${FOUNDER_SITE_LABEL}`}
  >
    {children ?? FOUNDER_NAME}
  </a>
);

/** “Founded by Ruthwik Reddy” with linked name */
export const FoundedBy = ({
  className = "",
  prefix = "Founded by",
}: {
  className?: string;
  prefix?: string;
}) => (
  <p className={cn("text-sm text-foreground/40", className)}>
    {prefix}{" "}
    <FounderLink className="text-foreground/60 hover:text-foreground transition-colors duration-300 underline-offset-2 hover:underline" />
  </p>
);

/** Compact pill for hero / section headers */
export const FounderBadge = ({ className = "" }: { className?: string }) => (
  <FounderLink
    className={cn(
      "inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-[11px] text-foreground/50 hover:text-foreground/80 uppercase tracking-[0.12em] transition-colors duration-300",
      className
    )}
    title={`Visit ${FOUNDER_SITE_LABEL}`}
  >
    Founded by {FOUNDER_NAME}
  </FounderLink>
);

/** Slim bar for builder and app pages without footer */
export const FounderStrip = ({ className = "" }: { className?: string }) => (
  <div
    className={cn(
      "shrink-0 border-t border-foreground/5 py-3 px-4 text-center text-[11px] text-foreground/35",
      className
    )}
  >
    ResumeGen · Founded by{" "}
    <FounderLink className="text-foreground/55 hover:text-foreground transition-colors underline-offset-2 hover:underline">
      {FOUNDER_NAME}
    </FounderLink>
    {" · "}
    <FounderLink className="text-foreground/45 hover:text-foreground transition-colors underline-offset-2 hover:underline">
      {FOUNDER_SITE_LABEL}
    </FounderLink>
  </div>
);

/** Footer-style founder block with multiple backlinks */
export const FounderBlock = () => (
  <div>
    <h3 className="text-[11px] font-medium text-foreground/50 uppercase tracking-[0.2em] mb-4">Founder</h3>
    <ul className="space-y-2.5">
      <li>
        <FounderLink className="text-sm text-foreground/35 hover:text-foreground transition-colors duration-300">
          {FOUNDER_NAME}
        </FounderLink>
      </li>
      <li>
        <FounderLink className="text-sm text-foreground/35 hover:text-foreground transition-colors duration-300">
          {FOUNDER_SITE_LABEL}
        </FounderLink>
      </li>
      <li>
        <FounderLink
          className="text-sm text-foreground/35 hover:text-foreground transition-colors duration-300"
          title="Portfolio & projects by Ruthwik Reddy"
        >
          Portfolio
        </FounderLink>
      </li>
      <li>
        <FounderLink
          className="text-sm text-foreground/35 hover:text-foreground transition-colors duration-300"
          title="About Ruthwik Reddy"
        >
          About Ruthwik
        </FounderLink>
      </li>
    </ul>
  </div>
);
