import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    setScrolled(latest > 10);
    if (latest > 100) {
      setHidden(diff > 5);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: "var(--navbar-height)" }}
    >
      {/* Background layer – animated opacity */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: scrolled ? 1 : 0,
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: scrolled
            ? "color-mix(in srgb, var(--background) 72%, transparent)"
            : "transparent",
          borderBottom: scrolled ? "1px solid color-mix(in srgb, var(--foreground) 6%, transparent)" : "1px solid transparent",
        }}
      />

      <div className="relative max-w-[1120px] mx-auto px-6 md:px-10 h-full grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Logo with animated entrance */}
        <motion.a
          href="/"
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <motion.img
            src="/logo.png"
            alt="CareerFlow"
            className="w-7 h-7 rounded-md object-contain"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.span
            className="font-bold text-lg text-foreground tracking-tight"
            animate={{
              fontSize: scrolled ? "1rem" : "1.125rem",
            }}
            transition={{ duration: 0.3 }}
          >
            CareerFlow
          </motion.span>
        </motion.a>

        {/* Center nav links with animated hover underline */}
        <div className="hidden md:flex items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="nav-link-animated relative text-foreground/50 hover:text-foreground text-[0.8125rem] font-medium transition-colors py-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-transparent transition-colors"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                variant="default"
                size="sm"
                className="text-sm font-medium rounded-full px-5 bg-foreground text-background hover:bg-foreground/90 transition-all"
                onClick={() => navigate("/login")}
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>

          <motion.button
            className="md:hidden p-1.5 rounded-lg text-foreground hover:bg-foreground/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu – slide down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "color-mix(in srgb, var(--background) 95%, transparent)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid color-mix(in srgb, var(--foreground) 6%, transparent)",
            }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-foreground/70 hover:text-foreground font-medium py-3 px-3 rounded-xl hover:bg-foreground/5 transition-colors text-sm"
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <div className="flex flex-col gap-2 px-6 pb-6 pt-3 border-t"
              style={{ borderColor: "color-mix(in srgb, var(--foreground) 6%, transparent)" }}
            >
              <Button
                variant="ghost"
                className="w-full justify-center text-sm"
                onClick={() => { setIsOpen(false); navigate("/login"); }}
              >
                Sign In
              </Button>
              <Button
                className="w-full justify-center text-sm rounded-full bg-foreground text-background"
                onClick={() => { setIsOpen(false); navigate("/login"); }}
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;