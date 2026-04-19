import { motion } from 'framer-motion';

export default function HeroIllustration() {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <motion.img
                src="/mainsvg/hero.svg"
                alt="CareerFlow Hero Illustration"
                className="w-full h-full object-contain max-h-[650px] drop-shadow-2xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            />
        </div>
    );
}
