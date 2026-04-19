import { X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OfferBand = () => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden"
                    style={{ background: "var(--foreground)", color: "var(--background)" }}
                >
                    {/* Shimmer sweep */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                            width: "200%",
                        }}
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                    />

                    <div className="flex items-center justify-center gap-2 py-2.5 px-6 text-xs font-medium tracking-wide relative z-10">
                        <motion.span
                            className="opacity-70"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 0.7, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            New: AI-powered interview prep is now live.
                        </motion.span>
                        <motion.a
                            href="#features"
                            className="underline underline-offset-2 opacity-90 hover:opacity-100 transition-opacity"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 0.9, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            whileHover={{ x: 2 }}
                        >
                            Learn more →
                        </motion.a>
                        <motion.button
                            onClick={() => setVisible(false)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70 transition-opacity"
                            aria-label="Dismiss"
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-3 h-3" />
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OfferBand;
