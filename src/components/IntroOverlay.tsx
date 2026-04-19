import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

interface IntroOverlayProps {
    onComplete: () => void;
}

// Preload cache to avoid refetching
const animationCache: Record<string, any> = {};

const preloadAnimation = async (url: string): Promise<any> => {
    if (animationCache[url]) return animationCache[url];

    try {
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            animationCache[url] = data;
            return data;
        }
    } catch (err) {
        console.error(`Failed to load animation: ${url}`, err);
    }
    return null;
};

const IntroOverlay = ({ onComplete }: IntroOverlayProps) => {
    // Stage management with loading state
    const [stage, setStage] = useState<"loading" | "careerflow" | "car" | "welcome" | "exit">("loading");

    // Animation data refs (prevents re-renders during load)
    const careerflowData = useRef<any>(null);
    const carData = useRef<any>(null);
    const welcomeData = useRef<any>(null);

    // Track if component is mounted
    const isMounted = useRef(true);

    // Minimum display time for loading shimmer (ensures smooth visual)
    const MIN_LOADING_TIME = 300;

    // Preload ALL animations in parallel immediately
    useEffect(() => {
        isMounted.current = true;
        const startTime = Date.now();

        const preloadAll = async () => {
            // Fetch all animations concurrently
            const [career, car, welcome] = await Promise.all([
                preloadAnimation("/jsonfiles/careerflow.json"),
                preloadAnimation("/jsonfiles/car.json"),
                preloadAnimation("/jsonfiles/welcome.json")
            ]);

            if (!isMounted.current) return;

            careerflowData.current = career;
            carData.current = car;
            welcomeData.current = welcome;

            // Ensure minimum loading time for smooth transition
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

            setTimeout(() => {
                if (isMounted.current) {
                    setStage("careerflow");
                }
            }, remaining);
        };

        preloadAll();

        return () => {
            isMounted.current = false;
        };
    }, []);

    // Sequence Controller
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (stage === "car") {
            // Play Car animation for 2.5s before transitioning
            timeout = setTimeout(() => setStage("welcome"), 2500);
        } else if (stage === "exit") {
            // Faster exit - don't make user wait
            timeout = setTimeout(onComplete, 800);
        }

        return () => clearTimeout(timeout);
    }, [stage, onComplete]);

    // Handle Lottie completion for non-looping animations
    const handleCareerflowComplete = useCallback(() => {
        if (isMounted.current) setStage("car");
    }, []);

    const handleWelcomeComplete = useCallback(() => {
        if (isMounted.current) setStage("exit");
    }, []);

    // Seamless crossfade variants - faster transitions, no jarring pauses
    const fadeVariants = {
        initial: {
            opacity: 0,
            scale: 0.95,
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        exit: {
            opacity: 0,
            scale: 1.02,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 1, 1]
            }
        }
    };

    // Car animation slides in smoothly
    const carVariants = {
        initial: {
            opacity: 0,
            x: -40,
            scale: 0.98
        },
        animate: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        exit: {
            opacity: 0,
            x: 40,
            scale: 0.98,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 1, 1]
            }
        }
    };

    // Container exit animation
    const containerVariants = {
        visible: {
            opacity: 1,
            scale: 1,
        },
        exit: {
            opacity: 0,
            scale: 1.08,
            transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
            }
        }
    };

    // Loading shimmer that morphs into first animation
    const shimmerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.2 }
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.3 }
        }
    };



    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
            variants={containerVariants}
            initial="visible"
            animate={stage === "exit" ? "exit" : "visible"}
        >
            {/* Animated background gradient */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50"
                animate={{
                    background: stage === "exit"
                        ? "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%)"
                        : "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #eff6ff 100%)"
                }}
                transition={{ duration: 0.8 }}
            />

            {/* Use mode="popLayout" for smoother overlapping transitions */}
            <AnimatePresence mode="popLayout">
                {/* LOADING STATE - Elegant shimmer */}
                {stage === "loading" && (
                    <motion.div
                        key="loading-stage"
                        className="relative flex flex-col justify-center items-center"
                        style={{ height: "60vh", width: "100%", maxWidth: "24rem" }}
                        variants={shimmerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {/* Pulsing logo placeholder */}
                        <motion.div
                            className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100"
                            animate={{
                                opacity: [0.5, 0.8, 0.5],
                                scale: [0.98, 1, 0.98]
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        {/* Shimmer bars */}
                        <div className="mt-6 space-y-2 w-48">
                            <motion.div
                                className="h-3 rounded-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:200%_100%]"
                                animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="h-3 w-3/4 rounded-full bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:200%_100%]"
                                animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
                            />
                        </div>
                    </motion.div>
                )}

                {/* STAGE 1: CAREERFLOW ANIMATION */}
                {stage === "careerflow" && careerflowData.current && (
                    <motion.div
                        key="careerflow-stage"
                        className="relative w-full max-w-xl px-4 flex justify-center items-center"
                        style={{ height: "60vh" }}
                        variants={fadeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                    >
                        <Lottie
                            animationData={careerflowData.current}
                            loop={false}
                            className="w-full h-full"
                            onComplete={handleCareerflowComplete}
                        />
                    </motion.div>
                )}

                {/* STAGE 2: CAR ANIMATION */}
                {stage === "car" && carData.current && (
                    <motion.div
                        key="car-stage"
                        className="relative w-full max-w-2xl px-4 flex justify-center items-center"
                        style={{ height: "60vh" }}
                        variants={carVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                    >
                        <Lottie
                            animationData={carData.current}
                            loop={true}
                            className="w-full h-full"
                        />
                    </motion.div>
                )}

                {/* STAGE 3: WELCOME ANIMATION */}
                {stage === "welcome" && welcomeData.current && (
                    <motion.div
                        key="welcome-stage"
                        className="relative w-full max-w-xl px-4 flex justify-center items-center"
                        style={{ height: "60vh" }}
                        variants={fadeVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                    >
                        <Lottie
                            animationData={welcomeData.current}
                            loop={false}
                            className="w-full h-full"
                            onComplete={handleWelcomeComplete}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress indicator - only show after loading */}
            <AnimatePresence>
                {stage !== "loading" && stage !== "exit" && (
                    <motion.div
                        className="absolute bottom-12 flex gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4 }}
                    >
                        {["careerflow", "car", "welcome"].map((s, i) => {
                            const stageIdx = ["careerflow", "car", "welcome"].indexOf(stage);
                            const isActive = stage === s;
                            const isPast = stageIdx > i;

                            return (
                                <motion.div
                                    key={s}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? "bg-primary" : isPast ? "bg-primary/60" : "bg-gray-300"
                                        }`}
                                    animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                />
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default IntroOverlay;
