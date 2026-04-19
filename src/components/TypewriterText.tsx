import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    speed?: number; // ms per char
    className?: string;
    cursorColor?: string;
    startDelay?: number;
    onComplete?: () => void;
}

const TypewriterText = ({
    text,
    speed = 100,
    className = "",
    cursorColor = "bg-sky-400",
    startDelay = 0,
    onComplete,
}: TypewriterTextProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    // Use refs to track index safely across renders
    const indexRef = useRef(0);
    const textRef = useRef(text);

    // Reset if text changes
    useEffect(() => {
        textRef.current = text;
        indexRef.current = 0;
        setDisplayedText("");
        setStarted(false);
    }, [text]);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, startDelay);

        return () => clearTimeout(startTimeout);
    }, [startDelay]);

    useEffect(() => {
        if (!started) return;

        const interval = setInterval(() => {
            if (indexRef.current < text.length) {
                // Slice prevents accumulation errors or double types
                indexRef.current++;
                setDisplayedText(text.substring(0, indexRef.current));
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [started, speed, onComplete, text]);

    return (
        <div className={`inline-flex items-center ${className}`}>
            <span>{displayedText}</span>
            <motion.span
                className={`inline-block w-[3px] h-[1em] ml-1 ${cursorColor}`}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default TypewriterText;
