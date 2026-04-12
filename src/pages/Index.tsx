
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Professional Templates",
      description: "Five expertly crafted templates designed to pass ATS systems and impress recruiters.",
      icon: "layout",
    },
    {
      title: "Real-time Preview",
      description: "Watch your resume come to life instantly as you type. No delays, no refreshes.",
      icon: "eye",
    },
    {
      title: "Easy Customization",
      description: "Intuitive controls to add, edit, and rearrange every section of your resume.",
      icon: "settings",
    },
    {
      title: "PDF Export",
      description: "Download a pixel-perfect, print-ready PDF with a single click.",
      icon: "file-text",
    },
    {
      title: "Auto-Save",
      description: "Your progress is saved automatically. Pick up right where you left off.",
      icon: "save",
    },
    {
      title: "Fully Responsive",
      description: "Build and edit your resume on any device — desktop, tablet, or phone.",
      icon: "smartphone",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-44 md:pb-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="fade-up">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Resume Builder
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight leading-[0.95] mb-8 fade-up fade-up-delay-1">
            Build resumes<br />
            that get noticed.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-12 fade-up fade-up-delay-2">
            Create clean, professional resumes in minutes. Preview in real-time. Download as PDF. No account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 fade-up fade-up-delay-3">
            <Link
              to="/builder"
              className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 text-sm font-medium hover:opacity-90 transition-opacity duration-300"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/templates"
              className="inline-flex items-center justify-center border border-foreground/20 text-foreground px-8 py-4 text-sm font-medium hover:border-foreground/60 transition-all duration-300"
            >
              View Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="border-t border-border/30" />
      </div>

      {/* Features */}
      <section className="py-24 md:py-32 px-6">
        <div className="container mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Features</p>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Everything you need,<br />nothing you don't.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
            {features.map((feature, index) => (
              <div key={index} className="bg-background">
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="border-t border-border/30" />
      </div>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
            Ready to begin?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
            Join thousands who've built standout resumes and landed interviews.
          </p>
          <Link
            to="/builder"
            className="inline-flex items-center justify-center gap-3 bg-foreground text-background px-10 py-4 text-sm font-medium hover:opacity-90 transition-opacity duration-300"
          >
            Create Your Resume
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
