"use client";

import { GraduationCap, Briefcase, RefreshCw } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";

const audiences = [
    {
        icon: GraduationCap,
        title: "Students & Freshers",
        description:
            "Build your foundation with internships, skill guides, and mentor support. Start your career journey on the right foot.",
        stat: "5,000+",
        statLabel: "students placed",
    },
    {
        icon: Briefcase,
        title: "Working Professionals",
        description:
            "Navigate career growth with personalized roadmaps, opportunity matching, and salary negotiation support.",
        stat: "40%",
        statLabel: "avg. salary increase",
    },
    {
        icon: RefreshCw,
        title: "Career Switchers",
        description:
            "Bridge the skills gap and connect with mentors who've successfully made the transition you're planning.",
        stat: "3 months",
        statLabel: "avg. transition time",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.15,
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function WhoIsItFor() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
    }, []);

    return (
        <section className="py-28 md:py-36 px-6" ref={sectionRef}>
            <div className="max-w-[1120px] mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-primary text-sm font-medium tracking-wide mb-4">
                        Built for You
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.08] text-foreground mb-5">
                        Wherever you are in
                        <br className="hidden sm:block" />
                        <span className="text-foreground/30"> your career.</span>
                    </h2>
                </motion.div>

                {/* Audience Cards – staggered + interactive */}
                <div className="grid md:grid-cols-3 gap-5">
                    {audiences.map((audience, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="card-interactive h-full p-8 md:p-10 rounded-3xl group"
                            style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
                            onMouseMove={handleMouseMove}
                            whileHover={{ y: -6 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                {/* Icon */}
                                <motion.div
                                    className="w-11 h-11 rounded-2xl flex items-center justify-center bg-foreground/5 mb-6"
                                    whileHover={{ scale: 1.15, rotate: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <audience.icon className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                                </motion.div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-foreground tracking-tight mb-3">
                                    {audience.title}
                                </h3>

                                {/* Description */}
                                <p className="text-foreground/50 leading-relaxed text-[0.9375rem] flex-1 mb-8">
                                    {audience.description}
                                </p>

                                {/* Stat anchor */}
                                <div className="pt-6 border-t border-foreground/5">
                                    <span className="text-2xl font-bold text-foreground tracking-tight">{audience.stat}</span>
                                    <span className="text-foreground/40 text-sm ml-2">{audience.statLabel}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
