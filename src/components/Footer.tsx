import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const footerSections = {
    Product: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Resume Builder", href: "#" },
      { label: "AI Career Bot", href: "#" },
      { label: "Mentor Matching", href: "#" },
    ],
    Company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
    Resources: [
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Webinars", href: "#" },
      { label: "Career Guides", href: "#" },
      { label: "API Docs", href: "#" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Data Processing", href: "#" },
    ],
  };

  const sectionEntries = Object.entries(footerSections);

  return (
    <footer
      ref={footerRef}
      className="pt-32 pb-10 px-6 relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* Animated Wave Background */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 opacity-10">
        <svg
          className="relative block w-[200%] h-[100px] md:h-[150px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="var(--foreground)"
            initial={{ x: "0%" }}
            animate={{ x: "-50%" }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
      <div className="max-w-[1120px] mx-auto">
        {/* Main footer grid – animated reveal */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Brand column */}
          <motion.div
            className="col-span-2 space-y-4 pr-8"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <motion.img
                src="/logo.png"
                alt="CareerFlow"
                className="w-7 h-7 rounded-md object-contain"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span className="text-lg font-bold text-foreground">CareerFlow</span>
            </div>
            <p className="text-foreground/40 text-sm leading-relaxed max-w-xs">
              AI-powered career guidance platform. Mentorship, resume building,
              and opportunity matching for the next generation of professionals.
            </p>
            {/* Social links */}
            <div className="flex gap-4 pt-2">
              {["Twitter", "LinkedIn", "GitHub"].map((platform) => (
                <motion.a
                  key={platform}
                  href="#"
                  className="text-foreground/25 text-xs font-medium transition-colors"
                  whileHover={{ color: "var(--foreground)", y: -1 }}
                >
                  {platform}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns – staggered */}
          {sectionEntries.map(([category, links], colIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + colIndex * 0.08, duration: 0.5 }}
            >
              <h4 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-foreground/35 text-sm transition-colors block"
                      whileHover={{ color: "var(--foreground)", x: 2 }}
                      transition={{ duration: 0.15 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar – slide up */}
        <motion.div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/30"
          style={{ borderTop: "1px solid var(--border)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p>© {currentYear} CareerFlow. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="transition-colors"
                whileHover={{ color: "var(--foreground)" }}
              >
                {item}
              </motion.a>
            ))}
            <span>Made by Sachin Rao</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
