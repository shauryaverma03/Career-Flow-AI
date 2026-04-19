"use client";

import { Star } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const testimonials = [
    {
        quote:
            "I went from confused to confident. The AI answered questions I didn't even know to ask. Got my dream job in 3 months.",
        name: "Priya Singh",
        role: "Product Manager",
        company: "TCS",
        rating: 5,
    },
    {
        quote:
            "Finding the right mentor changed everything. She helped me negotiate a 40% salary bump. The connections here are invaluable.",
        name: "Arjun Patel",
        role: "Senior Developer",
        company: "Flipkart",
        rating: 5,
    },
    {
        quote:
            "CareerFlow's resume analyzer got my CV past 50 ATS systems. I'm now getting interview calls every week.",
        name: "Neha Kapoor",
        role: "UX Designer",
        company: "Razorpay",
        rating: 5,
    },
    {
        quote:
            "The structured mentorship sessions gave me clarity I never had. Transitioned from sales to product management in 4 months.",
        name: "Rahul Verma",
        role: "Product Manager",
        company: "Swiggy",
        rating: 5,
    },
    {
        quote:
            "As a first-gen professional, I felt lost. CareerFlow's community and AI assistant became my personal career guide.",
        name: "Sneha Iyer",
        role: "Data Analyst",
        company: "Infosys",
        rating: 5,
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.12,
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    // Carousel state for mobile
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    // Auto-rotate carousel
    useEffect(() => {
        if (!autoPlay) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [autoPlay]);

    const goTo = useCallback((i: number) => {
        setActiveIndex(i);
        setAutoPlay(false);
        setTimeout(() => setAutoPlay(true), 8000);
    }, []);

    return (
        <section
            id="testimonials"
            className="py-28 md:py-36 px-6"
            style={{ background: "var(--secondary)" }}
            ref={sectionRef}
        >
            <div className="max-w-[1120px] mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16 md:mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-primary text-sm font-medium tracking-wide mb-4">
                        Real Stories
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.08] text-foreground mb-5">
                        Trusted by
                        <br className="hidden sm:block" />
                        <span className="text-foreground/30"> thousands.</span>
                    </h2>
                </motion.div>

                {/* Desktop: Grid of 3 cards */}
                <div className="hidden md:grid md:grid-cols-3 gap-5">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="card-interactive h-full"
                            whileHover={{ y: -6 }}
                        >
                            <div
                                className="relative h-full p-8 md:p-10 rounded-3xl flex flex-col"
                                style={{ background: "var(--background)", border: "1px solid var(--border)" }}
                            >
                                {/* Stars – animated */}
                                <div className="flex gap-0.5 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ delay: index * 0.12 + i * 0.05 + 0.3, type: "spring", stiffness: 300 }}
                                        >
                                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        </motion.div>
                                    ))}
                                </div>

                                <blockquote className="text-foreground text-[1.0625rem] font-medium leading-relaxed mb-8 flex-1">
                                    "{testimonial.quote}"
                                </blockquote>

                                <div className="flex items-center gap-3 pt-6 border-t border-foreground/5">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                                        style={{ background: "var(--primary)" }}
                                    >
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                                        <div className="text-foreground/40 text-xs font-medium">
                                            {testimonial.role} · {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: Carousel */}
                <div className="md:hidden relative">
                    <div className="overflow-hidden rounded-3xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -60 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="p-8 rounded-3xl"
                                style={{ background: "var(--background)", border: "1px solid var(--border)" }}
                            >
                                <div className="flex gap-0.5 mb-4">
                                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <blockquote className="text-foreground text-base font-medium leading-relaxed mb-6">
                                    "{testimonials[activeIndex].quote}"
                                </blockquote>
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                                        style={{ background: "var(--primary)" }}
                                    >
                                        {testimonials[activeIndex].name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground text-sm">{testimonials[activeIndex].name}</div>
                                        <div className="text-foreground/40 text-xs">
                                            {testimonials[activeIndex].role} · {testimonials[activeIndex].company}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-primary w-6" : "bg-foreground/15"
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>


            </div>
        </section>
    );
}
