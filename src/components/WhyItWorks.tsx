"use client";

import { Brain, Users, BarChart3, Shield } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Progressive Counter animation
const ProgressiveCounter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        if (!isInView) return;
        const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
        if (isNaN(numericValue)) {
            setDisplay(value);
            return;
        }
        const duration = 1800;
        const startTime = Date.now();
        const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * numericValue);
            if (value.includes(",")) {
                setDisplay(current.toLocaleString());
            } else {
                setDisplay(String(current));
            }
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(value);
        };
        requestAnimationFrame(tick);
    }, [isInView, value]);

    return (
        <div ref={ref} className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-2">
            <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
                {display}{suffix}
            </motion.span>
        </div>
    );
};

const pillars = [
    {
        icon: Brain,
        title: "AI That Understands You",
        description:
            "Our algorithms analyze your profile, skills, and goals to match you with the perfect mentors, jobs, and growth paths.",
        metric: "95",
        metricSuffix: "%",
        metricLabel: "match accuracy",
    },
    {
        icon: Users,
        title: "Real Human Mentorship",
        description:
            "500+ vetted industry experts from top companies. Structured sessions, real advice, proven results.",
        metric: "500",
        metricSuffix: "+",
        metricLabel: "expert mentors",
    },
    {
        icon: BarChart3,
        title: "Data-Driven Progress",
        description:
            "Track every skill learned, every application sent, every milestone achieved. Your growth, visualized.",
        metric: "10",
        metricSuffix: "x",
        metricLabel: "faster growth",
    },
    {
        icon: Shield,
        title: "Trusted by Thousands",
        description:
            "Join over 10,000 professionals who have successfully navigated their career transitions with CareerFlow.",
        metric: "10,000",
        metricSuffix: "+",
        metricLabel: "careers launched",
    },
];

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.12,
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function WhyItWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    // Subtle parallax on the entire section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

    return (
        <section
            className="py-28 md:py-36 px-6 relative overflow-hidden"
            style={{ background: "var(--secondary)" }}
            ref={sectionRef}
        >
            {/* Parallax background accent */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: bgY }}
            >
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
                    style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }}
                />
            </motion.div>

            <div className="max-w-[1120px] mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-primary text-sm font-medium tracking-wide mb-4">
                        Why It Works
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.08] text-foreground mb-5">
                        Designed for
                        <br className="hidden sm:block" />
                        <span className="text-foreground/30"> real outcomes.</span>
                    </h2>
                    <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
                        Built by career experts. Powered by AI. Validated by thousands of success stories.
                    </p>
                </motion.div>

                {/* 4 pillars with progressive counters */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="text-center md:text-left group"
                        >
                            {/* Progressive counter */}
                            <ProgressiveCounter value={pillar.metric} suffix={pillar.metricSuffix} />
                            <div className="text-foreground/40 text-xs font-medium uppercase tracking-wider mb-6">
                                {pillar.metricLabel}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-foreground tracking-tight mb-3">
                                {pillar.title}
                            </h3>

                            {/* Description */}
                            <p className="text-foreground/50 text-[0.875rem] leading-relaxed">
                                {pillar.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
