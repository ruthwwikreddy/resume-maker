
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  // Examples of resume templates for the hero section
  const templatePreviews = [
    { name: "Modern", image: "/modern-template.png" },
    { name: "Professional", image: "/professional-template.png" },
    { name: "Creative", image: "/creative-template.png" },
  ];
  
  // Feature list
  const features = [
    {
      title: "Professional Templates",
      description: "Choose from 5+ expertly designed resume templates that stand out from the crowd.",
      icon: "layout",
    },
    {
      title: "Real-time Preview",
      description: "See changes to your resume immediately as you type, with no delays.",
      icon: "eye",
    },
    {
      title: "Easy Customization",
      description: "Add, edit, and rearrange sections with simple drag-and-drop functionality.",
      icon: "settings",
    },
    {
      title: "Download as PDF",
      description: "Export your finished resume as a high-quality, print-ready PDF file.",
      icon: "file-text",
    },
    {
      title: "Auto-Save",
      description: "Never lose your progress with automatic saving to your local storage.",
      icon: "save",
    },
    {
      title: "Mobile Friendly",
      description: "Create and edit your resume on any device with our responsive design.",
      icon: "smartphone",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 z-0"></div>
        <div className="container relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Create Your Professional Resume <span className="text-resume-blue">in Minutes</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            ResumeGen helps you build beautiful, ATS-friendly resumes that stand out from the crowd and land you interviews.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/builder">
              <Button size="lg" className="bg-resume-blue hover:bg-resume-blue/90 text-white px-8 py-6 text-lg">
                Create My Resume
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-resume-blue text-resume-blue hover:bg-resume-blue/10 px-8 py-6 text-lg">
              Browse Templates
            </Button>
          </div>
        </div>
        
        {/* Template Previews */}
        <div className="mt-16 flex gap-4 overflow-hidden justify-center w-full">
          {templatePreviews.map((template, index) => (
            <div 
              key={index}
              className="relative w-64 h-80 bg-card rounded-lg overflow-hidden shadow-xl transition-all hover:scale-105 hover:shadow-resume-blue/20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4">
                <p className="font-medium text-white">{template.name} Template</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Powerful Features for a <span className="text-resume-blue">Perfect Resume</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 bg-card">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your <span className="text-resume-blue">Perfect Resume?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have created standout resumes and landed their dream jobs.
          </p>
          <Link to="/builder">
            <Button size="lg" className="bg-resume-blue hover:bg-resume-blue/90 text-white px-8 py-6 text-lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
