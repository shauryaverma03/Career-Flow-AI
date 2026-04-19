"use client";

import { useState } from "react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
    {
        question: "Is CareerFlow really free?",
        answer:
            "Yes. Create your profile, get AI career guidance, and access mentor matching — all free. We believe career guidance should be accessible to everyone.",
    },
    {
        question: "How does mentor matching work?",
        answer:
            "Tell us your goals. Our AI analyzes mentor expertise and maps your top 5 matches. Request sessions and start growing — the whole process takes minutes.",
    },
    {
        question: "Can I switch industries or roles?",
        answer:
            "Absolutely. We specialize in career transitions. Our mentors have made the jump themselves and provide proven strategies for switching successfully.",
    },
    {
        question: "How is the resume analyzer different?",
        answer:
            "We scan your resume against real ATS systems and job descriptions, providing actionable feedback — not generic tips. Our users see 3x more interview callbacks.",
    },
    {
        question: "Is my data secure?",
        answer:
            "Your data is encrypted end-to-end. We never share personal information with employers or third parties without explicit consent.",
    },
];

function FAQItem({
    question,
    answer,
    isOpen,
    onToggle,
    index,
    shouldAnimate,
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
    shouldAnimate: boolean;
}) {
    return (
        <motion.div
            className="border-b border-foreground/5 last:border-b-0"
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            <button
                onClick={onToggle}
                className="w-full py-6 flex items-center justify-between text-left group"
                aria-expanded={isOpen}
            >
                <motion.span
                    className="text-base font-semibold text-foreground pr-8 tracking-tight transition-colors"
                    animate={{ color: isOpen ? "var(--primary)" : "var(--foreground)" }}
                    transition={{ duration: 0.2 }}
                >
                    {question}
                </motion.span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-shrink-0"
                >
                    <ChevronDown className="w-4 h-4 text-foreground/30 group-hover:text-primary transition-colors" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <motion.p
                            className="pb-6 text-foreground/50 leading-relaxed text-[0.9375rem]"
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            transition={{ delay: 0.05, duration: 0.3 }}
                        >
                            {answer}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section className="py-28 md:py-36 px-6" ref={sectionRef}>
            <div className="max-w-[1120px] mx-auto">
                <div className="grid md:grid-cols-[1fr_1.5fr] gap-16 md:gap-20 items-start">
                    {/* Left – sticky header */}
                    <motion.div
                        className="md:sticky md:top-32"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-primary text-sm font-medium tracking-wide mb-4">FAQ</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.08] text-foreground mb-5">
                            Questions?
                            <br />
                            <span className="text-foreground/30">Answers.</span>
                        </h2>
                        <p className="text-foreground/50 text-base leading-relaxed">
                            Everything you need to know about CareerFlow. Can't find what you're looking for?{" "}
                            <a href="#" className="text-primary hover:underline transition-colors">
                                Contact our team
                            </a>
                            .
                        </p>
                    </motion.div>

                    {/* Right – FAQ items */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === index}
                                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                                index={index}
                                shouldAnimate={isInView}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
