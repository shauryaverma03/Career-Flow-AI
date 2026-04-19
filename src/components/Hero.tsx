import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// === Animated Counter ===
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const duration = 1500;
        const startTime = Date.now();
        const tick = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [isInView, value]);

    return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
};

// === Word-by-word animated text ===
const AnimatedWords = ({
    text,
    className = "",
    delay = 0,
}: {
    text: string;
    className?: string;
    delay?: number;
}) => {
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block mr-[0.3em]"
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                        delay: delay + i * 0.08,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

// === Ambient floating particles ===
const AmbientParticles = () => {
    const particles = useMemo(
        () =>
            Array.from({ length: 20 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: 2 + Math.random() * 3,
                duration: 8 + Math.random() * 12,
                delay: Math.random() * 5,
                driftX: -50 + Math.random() * 100,
                driftY: -80 + Math.random() * -120,
            })),
        []
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: "var(--primary)",
                    }}
                    animate={{
                        y: [0, p.driftY],
                        x: [0, p.driftX],
                        opacity: [0, 0.4, 0.4, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

const Hero = () => {
    const navigate = useNavigate();
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // Multi-layer parallax: text, image, and background move at different speeds
    const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
    const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <section
            ref={heroRef}
            className="relative min-h-[100vh] flex items-center overflow-hidden pt-14"
        >
            {/* Background parallax layer */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: bgY }}
            >
                {/* Gradient orbs */}
                <motion.div
                    className="absolute top-1/4 left-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]"
                    style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }}
                    animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
                    style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
                    animate={{ x: [0, -30, 0], y: [0, 35, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Ambient particles */}
            <AmbientParticles />

            {/* Main content */}
            <motion.div
                className="relative z-10 w-full max-w-[1120px] mx-auto px-6 md:px-10"
                style={{ opacity }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
                    {/* LEFT — Text (foreground parallax layer) */}
                    <motion.div
                        className="flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left"
                        style={{ y: textY }}
                    >
                        {/* Kicker badge – bounce in */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.5, type: "spring", stiffness: 200 }}
                            className="mb-6"
                        >
                            <span
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide"
                                style={{
                                    background: "color-mix(in srgb, var(--primary) 8%, transparent)",
                                    color: "var(--primary)",
                                    border: "1px solid color-mix(in srgb, var(--primary) 15%, transparent)",
                                }}
                            >
                                <motion.span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ background: "var(--primary)" }}
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                AI-Powered Career Guidance
                            </span>
                        </motion.div>

                        {/* Headline – word-by-word animation */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] font-bold tracking-[-0.04em] leading-[1.08] text-foreground mb-6">
                            <AnimatedWords text="Unlock Your True" delay={0.3} />
                            <br />
                            <motion.span
                                className="bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent inline-block bg-[length:200%_auto] animate-gradient-shift"
                                initial={{ opacity: 0, y: 25 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                Career Potential
                            </motion.span>
                        </h1>

                        {/* Subtitle – slide up */}
                        <motion.p
                            className="text-base md:text-lg text-foreground/55 max-w-lg mx-auto lg:mx-0 mb-8 font-normal leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                        >
                            Personalized roadmaps, expert mentorship, and AI-powered tools
                            to guide students, freshers, and professionals to their dream careers.
                        </motion.p>

                        {/* CTAs with micro-animations */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.05, duration: 0.6 }}
                        >
                            {/* Primary CTA – glow pulse + shine sweep on hover */}
                            <motion.div
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                            >
                                <Button
                                    size="lg"
                                    className="btn-primary-animated rounded-full px-8 py-6 text-base font-medium bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#06B6D4] text-white shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                                    onClick={() => navigate("/login")}
                                >
                                    Start Free
                                    <motion.span
                                        className="ml-2 inline-flex"
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.span>
                                </Button>
                            </motion.div>

                            {/* Ghost CTA – underline sweep */}
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className="btn-ghost-animated rounded-full px-8 py-6 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                                >
                                    Learn More
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Stats row – animated counters */}
                        <motion.div
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.3, duration: 0.8 }}
                        >
                            {[
                                { value: 10000, suffix: "+", label: "Careers Launched" },
                                { value: 500, suffix: "+", label: "Expert Mentors" },
                                { value: 95, suffix: "%", label: "Success Rate" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center lg:text-left">
                                    <div className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-[10px] text-foreground/35 font-medium uppercase tracking-wider mt-0.5">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT — Hero SVG (background parallax layer – moves slower) */}
                    <motion.div
                        className="flex items-center justify-center order-1 lg:order-2"
                        style={{ y: imageY, scale: imageScale, rotateZ: imageRotate }}
                    >
                        <motion.div
                            className="w-full max-w-[560px] lg:max-w-none relative"
                            initial={{ opacity: 0, scale: 0.9, x: 40 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {/* Glow behind SVG */}
                            <motion.div
                                className="absolute inset-0 rounded-full opacity-[0.06] blur-3xl"
                                style={{ background: "var(--primary)" }}
                                animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.08, 0.04] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.img
                                src="/mainsvg/hero.svg"
                                alt="CareerFlow – AI-powered career guidance platform"
                                className="w-full h-auto drop-shadow-xl relative z-10"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                <motion.div
                    className="w-6 h-9 border-2 border-foreground/15 rounded-full flex justify-center cursor-pointer"
                    whileHover={{ borderColor: "var(--primary)", scale: 1.1 }}
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
                >
                    <motion.div
                        className="w-1 h-2.5 bg-foreground/30 rounded-full mt-1.5"
                        animate={{ y: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
