
import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Professional Templates",
      description: "Ten expertly crafted templates designed to pass ATS systems and impress recruiters.",
      icon: "layout",
    },
    {
      title: "Real-time Preview",
      description: "Watch your resume update instantly as you type. Zero delays.",
      icon: "eye",
    },
    {
      title: "Easy Customization",
      description: "Intuitive controls to shape every section exactly how you want it.",
      icon: "settings",
    },
    {
      title: "PDF Export",
      description: "Download a pixel-perfect, print-ready PDF with one click.",
      icon: "file-text",
    },
    {
      title: "Auto-Save",
      description: "Your progress saves automatically. Resume right where you left off.",
      icon: "save",
    },
    {
      title: "Fully Responsive",
      description: "Build and edit on any device — desktop, tablet, or phone.",
      icon: "smartphone",
    },
  ];

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left — Text */}
            <div>
              <div className="fade-up">
                <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-[11px] text-foreground/50 uppercase tracking-[0.15em] mb-8">
                  <Sparkles className="h-3 w-3 text-foreground/40" />
                  Resume Builder
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-[-0.03em] leading-[1.05] mb-7 fade-up fade-up-delay-1">
                Build resumes<br />
                <span className="text-foreground/70">that get noticed.</span>
              </h1>
              <p className="text-base md:text-lg text-foreground/40 max-w-md leading-relaxed mb-10 fade-up fade-up-delay-2">
                Create clean, professional resumes in minutes. Preview in real-time. Download as PDF. No account required.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 fade-up fade-up-delay-3">
                <Link to="/builder" className="btn-primary px-7 py-3.5">
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/templates" className="btn-glass px-7 py-3.5">
                  View Templates
                </Link>
              </div>
            </div>

            {/* Right — Floating glass cards */}
            <div className="relative hidden lg:block h-[440px] fade-up fade-up-delay-4">
              <div className="absolute top-4 right-0 w-72 glass-card rounded-2xl p-6 z-20" style={{ animation: "float 6s ease-in-out infinite" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-foreground/10" />
                  <div>
                    <div className="h-3 w-24 bg-foreground/15 rounded-full mb-1.5" />
                    <div className="h-2 w-16 bg-foreground/8 rounded-full" />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="h-2 w-full bg-foreground/8 rounded-full" />
                  <div className="h-2 w-5/6 bg-foreground/6 rounded-full" />
                  <div className="h-2 w-4/6 bg-foreground/5 rounded-full" />
                </div>
                <div className="mt-5 flex gap-2">
                  <div className="h-5 w-14 bg-foreground/8 rounded-md" />
                  <div className="h-5 w-14 bg-foreground/6 rounded-md" />
                  <div className="h-5 w-14 bg-foreground/5 rounded-md" />
                </div>
              </div>

              <div className="absolute top-20 left-4 w-64 glass-card rounded-2xl p-5 z-10 opacity-60" style={{ animation: "float 7s ease-in-out infinite 0.5s" }}>
                <div className="space-y-3">
                  <div className="h-3 w-28 bg-foreground/10 rounded-full" />
                  <div className="h-2 w-full bg-foreground/6 rounded-full" />
                  <div className="h-2 w-4/5 bg-foreground/5 rounded-full" />
                  <div className="h-2 w-3/5 bg-foreground/4 rounded-full" />
                </div>
              </div>

              <div className="absolute bottom-8 right-12 w-56 glass-card rounded-2xl p-5 z-30 opacity-80" style={{ animation: "float 5.5s ease-in-out infinite 1s" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded-md bg-foreground/10" />
                  <div className="h-2.5 w-20 bg-foreground/12 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-foreground/6 rounded-full" />
                  <div className="h-2 w-3/4 bg-foreground/5 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="container mx-auto px-6 fade-up fade-up-delay-5">
        <div className="glass-card rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "10k+", label: "Resumes Created" },
            { value: "10", label: "Templates" },
            { value: "Free", label: "No Hidden Costs" },
            { value: "PDF", label: "Instant Download" },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
              <p className="text-xs text-foreground/35 mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="py-28 md:py-36 px-6 relative">
        <div className="container mx-auto">
          <div className="max-w-xl mb-16">
            <p className="section-label mb-4">Features</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-[-0.02em] leading-tight">
              Everything you need,<br />
              <span className="text-foreground/50">nothing you don't.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28 md:pb-36 px-6 relative">
        <div className="container mx-auto max-w-3xl">
          <div className="glass-card rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] via-transparent to-foreground/[0.02] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                Ready to begin?
              </h2>
              <p className="text-base text-foreground/40 mb-8 max-w-md mx-auto leading-relaxed">
                Join thousands who've built standout resumes and landed interviews.
              </p>
              <Link to="/builder" className="btn-primary px-8 py-3.5">
                Create Your Resume
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
};

export default Index;
