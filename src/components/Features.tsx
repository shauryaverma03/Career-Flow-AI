"use client";

import { Users, Briefcase, FileText, Bot, Target, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, useInView, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import type { LucideIcon } from "lucide-react";

// === Data ===
const companies = [
  { name: "Google", url: "https://logo.clearbit.com/google.com" },
  { name: "Microsoft", url: "https://logo.clearbit.com/microsoft.com" },
  { name: "Amazon", url: "https://logo.clearbit.com/amazon.com" },
  { name: "Flipkart", url: "https://logo.clearbit.com/flipkart.com" },
  { name: "Razorpay", url: "https://logo.clearbit.com/razorpay.com" },
  { name: "TCS", url: "https://logo.clearbit.com/tcs.com" },
  { name: "Swiggy", url: "https://logo.clearbit.com/swiggy.com" },
  { name: "Uber", url: "https://logo.clearbit.com/uber.com" },
];

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
}

const gridFeatures: Feature[] = [
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description: "Identify missing skills with AI-driven assessments tailored to your target role.",
    cta: "Take Assessment",
  },
  {
    icon: Briefcase,
    title: "Smart Job Matching",
    description: "Get recommendations for roles where you're a top candidate based on your profile.",
    cta: "Find Jobs",
  },
  {
    icon: Calendar,
    title: "Community Events",
    description: "Join workshops, webinars, and networking sessions with industry leaders.",
    cta: "Join Community",
  },
  {
    icon: Bot,
    title: "24/7 Career Copilot",
    description: "Instant answers to your career questions, from salary negotiation to interview prep.",
    cta: "Chat with AI",
  },
];

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

// 1. Logo Strip
const CompanyStrip = () => (
  <div className="w-full py-10 md:py-14 border-b border-foreground/5 overflow-hidden bg-background/50 backdrop-blur-sm">
    <div className="max-w-[1120px] mx-auto px-6 mb-8 text-center">
      <p className="text-sm font-medium text-foreground/40 uppercase tracking-widest">Trusted by professionals from</p>
    </div>
    <div className="relative flex overflow-x-hidden group">
      <div className="animate-marquee flex gap-16 md:gap-24 items-center whitespace-nowrap py-4 px-4">
        {[...companies, ...companies].map((company, i) => (
          <div key={i} className="relative group/logo flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-40 hover:opacity-100 hover:scale-110">
            <img
              src={company.url}
              alt={company.name}
              className="h-8 md:h-10 w-auto object-contain"
              onError={(e) => {
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  e.currentTarget.style.display = 'none';
                  parent.className = "text-xl font-bold text-foreground/40";
                  parent.innerText = company.name;
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// 2. Mock Interface (Abstract Screenshot)
const FeatureMockup = ({ type }: { type: "resume" | "mentor" }) => {
  const isResume = type === "resume";

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-foreground/5 bg-background">
      {/* Window Header */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-foreground/5 flex items-center px-4 gap-2 z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 pt-8 p-6 flex flex-col gap-4 bg-secondary/30">
        {isResume ? (
          // Resume Builder Mockup
          <div className="flex gap-4 h-full">
            <div className="w-1/3 h-full bg-background rounded-lg p-3 shadow-sm border border-foreground/5 flex flex-col gap-2">
              <div className="w-12 h-12 rounded-full bg-foreground/10 mb-2" />
              <div className="h-2 w-20 bg-foreground/20 rounded" />
              <div className="h-2 w-16 bg-foreground/10 rounded" />
              <div className="mt-4 space-y-2">
                <div className="h-1.5 w-full bg-foreground/5 rounded" />
                <div className="h-1.5 w-full bg-foreground/5 rounded" />
                <div className="h-1.5 w-2/3 bg-foreground/5 rounded" />
              </div>
            </div>
            <div className="flex-1 h-full bg-background rounded-lg p-4 shadow-sm border border-foreground/5 relative overflow-hidden">
              {/* Animated Scan Line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.5)] z-20"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="space-y-4 opacity-50">
                <div className="h-4 w-1/3 bg-foreground/20 rounded" />
                <div className="space-y-2">
                  <div className="h-2 w-full bg-foreground/10 rounded" />
                  <div className="h-2 w-full bg-foreground/10 rounded" />
                  <div className="h-2 w-4/5 bg-foreground/10 rounded" />
                </div>
                <div className="h-20 w-full bg-foreground/5 rounded border-2 border-dashed border-foreground/10 flex items-center justify-center">
                  <span className="text-[10px] text-foreground/40">Drop Resume Here</span>
                </div>
              </div>

              {/* Floating Score Badge */}
              <motion.div
                className="absolute bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                ATS Score: 98%
              </motion.div>
            </div>
          </div>
        ) : (
          // Mentor Chat Mockup
          <div className="flex flex-col h-full bg-background rounded-lg shadow-sm border border-foreground/5 overflow-hidden">
            <div className="p-3 border-b border-foreground/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">JD</div>
              <div>
                <div className="h-2 w-24 bg-foreground/20 rounded mb-1" />
                <div className="h-1.5 w-16 bg-green-500/30 rounded" />
              </div>
            </div>
            <div className="flex-1 p-4 space-y-3">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-foreground/10 shrink-0" />
                <div className="bg-foreground/5 p-2 rounded-2xl rounded-tl-none text-[10px] text-foreground/60 w-2/3">
                  How can I help with your career transition today?
                </div>
              </div>
              <motion.div
                className="flex gap-2 flex-row-reverse"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 shrink-0" />
                <div className="bg-primary/10 p-2 rounded-2xl rounded-tr-none text-[10px] text-foreground/80 w-3/4">
                  I'm looking to move from Sales to Product Management. Where do I start?
                </div>
              </motion.div>
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="w-6 h-6 rounded-full bg-foreground/10 shrink-0" />
                <div className="bg-foreground/5 p-2 rounded-2xl rounded-tl-none text-[10px] text-foreground/60 w-3/4">
                  Let's start with a skills gap analysis. I've sent you a roadmap...
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div className="flex flex-col">
      <CompanyStrip />

      <section id="features" className="py-24 md:py-32 px-6" ref={sectionRef}>
        <div className="max-w-[1120px] mx-auto">

          {/* Section Header */}
          <motion.div
            className="text-center mb-24"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-primary text-sm font-medium tracking-wide mb-4 uppercase">Features</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Everything you need to <br className="hidden md:block" />
              <span className="text-foreground/40">accelerate your career.</span>
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto leading-relaxed">
              Our platform combines AI precision with human expertise to give you the
              ultimate advantage in today's job market.
            </p>
          </motion.div>

          {/* Feature 1: Resume Builder (Left Text, Right Image) */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">ATS-Proof Resumes in Minutes</h3>
              <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
                Stop guessing keywords. Our AI analyzes job descriptions and optimizes your resume
                in real-time to pass Applicant Tracking Systems (ATS) used by top companies.
              </p>
              <ul className="space-y-4 mb-8">
                {["Targeted keyword optimization", "Real-time compatibility score", "Professional templates"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <motion.button
                className="text-primary font-semibold flex items-center gap-2 group"
                whileHover={{ x: 5 }}
              >
                Build Your Resume <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="perspective-1000"
            >
              <TiltCard>
                <FeatureMockup type="resume" />
              </TiltCard>
            </motion.div>
          </div>

          {/* Feature 2: Mentorship (Right Text, Left Image) */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <motion.div
              className="order-2 md:order-1 perspective-1000"
              initial={{ opacity: 0, x: -30, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <TiltCard>
                <FeatureMockup type="mentor" />
              </TiltCard>
            </motion.div>

            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">1-on-1 Expert Mentorship</h3>
              <p className="text-foreground/60 text-lg mb-8 leading-relaxed">
                Connect with industry veterans from Google, Microsoft, and Amazon.
                Get personalized guidance, mock interviews, and insider tips to land your dream role.
              </p>
              <ul className="space-y-4 mb-8">
                {["Verified industry experts", "Flexible scheduling", "Structured learning paths"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <motion.button
                className="text-primary font-semibold flex items-center gap-2 group"
                whileHover={{ x: 5 }}
              >
                Find a Mentor <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>

          {/* Modular Grid for other features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gridFeatures.map((feature, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-3xl bg-secondary/50 border border-border group hover:border-primary/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="mb-6 w-10 h-10 inline-flex items-center justify-center rounded-xl bg-primary/5 text-foreground/70 group-hover:text-primary group-hover:bg-primary/10 transition-colors"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="w-5 h-5" />
                </motion.div>
                <h4 className="text-xl font-bold text-foreground mb-3">{feature.title}</h4>
                <p className="text-foreground/50 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
                <span className="text-xs font-bold text-primary uppercase tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
                  {feature.cta} <ArrowRight className="w-3 h-3" />
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
