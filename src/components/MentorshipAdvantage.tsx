import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useCallback } from "react";

const stories = [
  {
    quote: "From a small-town college to a product role at a top startup — CareerFlow made it possible.",
    name: "Ananya R.",
    context: "First-generation professional",
    emoji: "🌱",
  },
  {
    quote: "I was stuck in a dead-end job for 4 years. Three months with a CareerFlow mentor changed everything.",
    name: "Vikram S.",
    context: "Career switcher → Tech lead",
    emoji: "🚀",
  },
  {
    quote: "The resume analyzer and mock interviews gave me the confidence I never had before.",
    name: "Meera K.",
    context: "Fresh graduate → UX Designer",
    emoji: "✨",
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

export default function MentorshipAdvantage() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Parallax background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  return (
    <section className="py-28 md:py-36 px-6 relative overflow-hidden" ref={sectionRef}>
      {/* Parallax background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ background: "radial-gradient(ellipse at center, var(--primary), transparent 70%)" }}
        />
      </motion.div>

      <div className="max-w-[1120px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-primary text-sm font-medium tracking-wide mb-4">
            Real Impact
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.08] text-foreground mb-5">
            Careers transformed,
            <br className="hidden sm:block" />
            <span className="text-foreground/30"> lives changed.</span>
          </h2>
          <p className="text-foreground/50 text-lg max-w-2xl mx-auto">
            Behind every stat is a person who took a leap of faith —
            and landed exactly where they wanted to be.
          </p>
        </motion.div>

        {/* Story cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="card-interactive h-full p-8 md:p-10 rounded-3xl flex flex-col group"
              style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
              onMouseMove={handleMouseMove}
              whileHover={{ y: -6 }}
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Emoji – bounce in */}
                <motion.span
                  className="text-3xl mb-6 block"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 200 }}
                >
                  {story.emoji}
                </motion.span>

                {/* Quote */}
                <blockquote className="text-foreground text-[1.0625rem] font-medium leading-relaxed mb-8 flex-1">
                  "{story.quote}"
                </blockquote>

                {/* Attribution */}
                <div className="pt-6 border-t border-foreground/5">
                  <div className="font-semibold text-foreground text-sm">{story.name}</div>
                  <div className="text-foreground/40 text-xs font-medium mt-0.5">{story.context}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live engagement indicator */}
        <motion.div
          className="text-center mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
            style={{ background: "var(--secondary)", border: "1px solid var(--border)" }}
            whileHover={{ scale: 1.03, y: -2 }}
          >
            <motion.span
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-foreground/50 text-sm font-medium">
              <span className="text-foreground font-bold">127 people</span> started their journey this week
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
