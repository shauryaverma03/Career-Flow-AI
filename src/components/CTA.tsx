import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  // Parallax on background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-36 px-6 relative overflow-hidden"
      style={{ background: "var(--foreground)" }}
    >
      {/* Animated ambient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "var(--primary)" }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "var(--accent)" }}
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="max-w-[800px] mx-auto text-center relative z-10"
        style={{ scale: bgScale }}
      >
        {/* Headline */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.08] mb-6"
          style={{ color: "var(--background)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Ready to start
          <br />
          growing?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-lg mb-10 max-w-xl mx-auto"
          style={{ color: "var(--background)", opacity: 0.5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Join 10,000+ professionals who stopped guessing and started building their dream careers.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            {/* Pulsing Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-background/30"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />

            <Button
              size="lg"
              className="relative z-10 btn-primary-animated rounded-full px-8 py-6 text-base font-medium shadow-xl"
              style={{ background: "var(--background)", color: "var(--foreground)" }}
              onClick={() => navigate("/login")}
            >
              Start Free Today
              <motion.span
                className="ml-2 inline-flex"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="ghost"
              size="lg"
              className="btn-ghost-animated rounded-full px-8 py-6 text-base font-medium border"
              style={{
                color: "var(--background)",
                borderColor: "rgba(255,255,255,0.15)",
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          className="flex items-center justify-center gap-4 text-sm"
          style={{ color: "var(--background)", opacity: 0.35 }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="flex items-center gap-2">
            <motion.span
              className="w-1.5 h-1.5 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            No credit card required
          </span>
          <span>·</span>
          <span>Cancel anytime</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTA;
