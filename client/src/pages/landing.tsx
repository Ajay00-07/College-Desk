import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, BookOpen, GraduationCap, Award, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import loginIllustration from "@assets/generated_images/College_workflow_automation_illustration_3112c521.png";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: BookOpen,
      title: "Automated Attendance",
      description: "Track and manage student attendance with intelligent automation and real-time updates."
    },
    {
      icon: Award,
      title: "Smart Approvals",
      description: "Streamlined approval workflows for leave requests, condonation, and academic processes."
    },
    {
      icon: TrendingUp,
      title: "AI Compliance Assistant",
      description: "Get instant answers to academic policies, attendance rules, and compliance questions."
    },
    {
      icon: CheckCircle,
      title: "Document Generation",
      description: "Automatically generate attendance reports, condonation letters, and official documents."
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "HOD - Computer Science",
      rating: 5,
      comment: "College Desk has revolutionized our administrative processes. The AI assistant is incredibly helpful for quick policy clarifications."
    },
    {
      name: "Prof. Michael Chen",
      role: "Faculty - Electronics",
      rating: 5,
      comment: "Managing attendance and approvals is now effortless. The automated document generation saves hours of work."
    },
    {
      name: "Alex Kumar",
      role: "Student - CSE",
      rating: 5,
      comment: "Easy to track my attendance and submit requests. The interface is intuitive and responsive."
    }
  ];

  const portals = [
    {
      title: "Student Portal",
      description: "Access your attendance records, submit leave requests, and track academic progress.",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      role: "student",
      onClick: () => {
        localStorage.setItem('selectedRole', 'student');
        setLocation("/signup/student");
      }
    },
    {
      title: "Faculty Portal",
      description: "Manage student attendance, review requests, and oversee academic workflows.",
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      role: "faculty",
      onClick: () => {
        localStorage.setItem('selectedRole', 'faculty');
        setLocation("/signup/faculty");
      }
    },
    {
      title: "Admin Portal",
      description: "Oversee department operations, approve critical requests, and manage faculty coordination.",
      icon: Award,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      role: "hod",
      onClick: () => {
        setLocation("/admin-selection");
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">College Desk</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setLocation("/login")}>
              Sign In
            </Button>
            <Button onClick={() => setLocation("/signup")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                Engineering College Edition
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Streamline Your
                <span className="block text-primary">Academic Workflow</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                College Desk automates attendance management, document generation, and approval workflows with AI-powered assistance for engineering colleges.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" onClick={() => setLocation("/signup")}>
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => setLocation("/login")}>
                Sign In
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Colleges Using</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Students Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground">Documents Generated</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src={loginIllustration}
              alt="College workflow automation"
              className="w-full max-w-md mx-auto rounded-xl shadow-2xl smooth-transition hover:scale-105 float-animation"
            />
            <div className="absolute -bottom-6 -left-6 bg-background border rounded-lg p-4 shadow-lg animate-pulse">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">AI Compliance Assistant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How College Desk Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our intelligent platform automates complex academic workflows, making administration effortless for colleges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground">
              Trusted by educators and students across engineering colleges
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portals */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Portal</h2>
            <p className="text-lg text-muted-foreground">
              Access your personalized dashboard based on your role
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portals.map((portal, index) => (
              <Card key={index} className={`p-8 text-center hover:shadow-xl transition-all cursor-pointer ${portal.bgColor}`} onClick={portal.onClick}>
                <div className={`w-16 h-16 bg-gradient-to-r ${portal.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <portal.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{portal.title}</h3>
                <p className="text-muted-foreground mb-6">{portal.description}</p>
                <Button className="w-full">
                  Access Portal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">College Desk</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 College Desk. Engineering College Edition. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
