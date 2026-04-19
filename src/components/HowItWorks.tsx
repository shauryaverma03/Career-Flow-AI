import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
	{
		number: "01",
		title: "Create Your Profile",
		description:
			"Sign up and tell us about your goals, skills, and interests. Our AI personalizes your experience from day one.",
	},
	{
		number: "02",
		title: "Get Matched",
		description:
			"Discover mentors, jobs, and learning paths tailored to you. Connect with the right people and resources.",
	},
	{
		number: "03",
		title: "Learn & Grow",
		description:
			"Take assessments, build your resume, and sharpen skills. Track your progress in real-time.",
	},
	{
		number: "04",
		title: "Land Your Dream Role",
		description:
			"Interview prep, salary negotiation, offer evaluation. We're with you every step of the way.",
	},
];

const stepVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.3 + i * 0.18,
			duration: 0.6,
			ease: [0.16, 1, 0.3, 1],
		},
	}),
};

const circleVariants = {
	hidden: { scale: 0, opacity: 0 },
	visible: (i: number) => ({
		scale: 1,
		opacity: 1,
		transition: {
			delay: 0.35 + i * 0.18,
			type: "spring",
			stiffness: 200,
			damping: 15,
		},
	}),
};

const HowItWorks = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

	return (
		<section id="how-it-works" className="py-28 md:py-36 px-6" ref={sectionRef}>
			<div className="max-w-[1120px] mx-auto">
				{/* Section Header */}
				<motion.div
					className="text-center mb-16 md:mb-20"
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
				>
					<p className="text-primary text-sm font-medium tracking-wide mb-4">
						Simple Process
					</p>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-[1.08] text-foreground mb-5">
						From sign-up to
						<br className="hidden sm:block" />
						<span className="text-foreground/30"> dream career.</span>
					</h2>
				</motion.div>

				{/* Steps */}
				<div className="relative max-w-5xl mx-auto">
					{/* Connecting line – desktop */}
					<div className="hidden md:block absolute top-[28px] left-[40px] right-[40px] h-px"
						style={{ background: "var(--border)" }}
					/>
					{/* Animated progress line */}
					<motion.div
						className="hidden md:block absolute top-[28px] left-[40px] h-px origin-left"
						style={{ background: "var(--primary)" }}
						initial={{ width: 0 }}
						animate={isInView ? { width: "calc(100% - 80px)" } : { width: 0 }}
						transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
					/>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
						{steps.map((step, index) => (
							<motion.div
								key={index}
								custom={index}
								variants={stepVariants}
								initial="hidden"
								animate={isInView ? "visible" : "hidden"}
								className="flex flex-col items-center md:items-start md:text-left text-center"
							>
								{/* Step circle – spring bounce in */}
								<motion.div
									custom={index}
									variants={circleVariants}
									initial="hidden"
									animate={isInView ? "visible" : "hidden"}
									className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold mb-6 relative z-10 cursor-default"
									style={{
										background: "var(--background)",
										border: "2px solid var(--border)",
										color: "var(--foreground)",
									}}
									whileHover={{
										borderColor: "var(--primary)",
										color: "var(--primary)",
										scale: 1.1,
										boxShadow: "0 0 20px rgba(37, 99, 235, 0.15)",
									}}
									transition={{ type: "spring", stiffness: 300 }}
								>
									{step.number}
									{/* Pulse ring on hover */}
									<motion.div
										className="absolute inset-0 rounded-full"
										style={{ border: "2px solid var(--primary)" }}
										initial={{ scale: 1, opacity: 0 }}
										whileHover={{
											scale: 1.5,
											opacity: [0, 0.3, 0],
											transition: { duration: 1, repeat: Infinity },
										}}
									/>
								</motion.div>

								{/* Content */}
								<h3 className="text-lg font-semibold text-foreground tracking-tight mb-2">
									{step.title}
								</h3>
								<p className="text-foreground/50 text-sm leading-relaxed">
									{step.description}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
