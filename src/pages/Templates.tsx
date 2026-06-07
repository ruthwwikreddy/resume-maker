
import { Link } from "react-router-dom";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import TemplateThumbnail from "@/components/templates/shared/TemplateThumbnail";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/constants";
import { TemplateName } from "@/lib/types";
import { ArrowRight, Layout, Sparkles } from "lucide-react";

const Templates = () => {
  useEffect(() => {
    document.title = "Templates | ResumeGen";
  }, []);

  return (
    <PageShell>
      <main className="pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-xl mb-16 fade-up">
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-[11px] text-foreground/50 uppercase tracking-[0.15em] mb-6">
              <Layout className="h-3 w-3 text-foreground/40" />
              Templates
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-[-0.03em] leading-[1.05] mb-5">
              Pick a layout<br />
              <span className="text-foreground/70">that fits you.</span>
            </h1>
            <p className="text-base md:text-lg text-foreground/40 leading-relaxed">
              Start with clean, minimal layouts — then explore executive and industry-specific designs.
            </p>
          </div>

          {/* Stats bar */}
          <div className="glass-card rounded-2xl p-6 grid grid-cols-3 gap-4 text-center mb-16 fade-up fade-up-delay-1">
            {[
              { value: "10", label: "Templates" },
              { value: "PDF", label: "Export Ready" },
              { value: "Free", label: "Always" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
                <p className="text-[10px] text-foreground/35 mt-0.5 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {TEMPLATE_CATEGORIES.map((category, categoryIndex) => {
            const categoryTemplates = TEMPLATES.filter((t) => t.category === category.id);

            return (
              <section key={category.id} className="mb-14">
                <div className="mb-6 fade-up">
                  <p className="section-label mb-1">{category.label}</p>
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                    {category.description}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {categoryTemplates.map((template, index) => (
                    <div
                      key={template.id}
                      className="glass-card rounded-2xl overflow-hidden group fade-up transition-all duration-500"
                      style={{ animationDelay: `${categoryIndex * 0.1 + index * 0.05}s` }}
                    >
                      <div className="p-4 pb-0">
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center gap-1 glass rounded-full px-2.5 py-0.5 text-[9px] text-foreground/45 uppercase tracking-[0.12em]">
                            <Sparkles className="h-2.5 w-2.5 text-foreground/30" />
                            {template.tag}
                          </span>
                        </div>
                        <TemplateThumbnail templateId={template.id as TemplateName} size="md" />
                      </div>
                      <div className="p-5 border-t border-foreground/5 mt-4">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-foreground/30 mb-1">Template</p>
                        <p className="text-base font-semibold text-foreground tracking-tight mb-2">
                          {template.name}
                        </p>
                        <p className="text-xs text-foreground/40 leading-relaxed mb-4 line-clamp-2">
                          {template.description}
                        </p>
                        <Link
                          to={`/builder?template=${template.id}`}
                          className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-all duration-300 group-hover:gap-2.5"
                        >
                          Use this template
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          <div className="glass-card rounded-3xl p-12 md:p-16 text-center relative overflow-hidden mb-16">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] via-transparent to-foreground/[0.02] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
                Ready to build?
              </h2>
              <p className="text-base text-foreground/40 mb-8 max-w-md mx-auto leading-relaxed">
                Pick any template, customize every section, and download a pixel-perfect PDF.
              </p>
              <Link
                to="/builder"
                className="btn-primary px-8 py-3.5"
              >
                Open Builder
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageShell>
  );
};

export default Templates;
