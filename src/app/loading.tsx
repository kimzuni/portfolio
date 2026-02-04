"use client";

import { motion } from "framer-motion";



export default function Loading() {
	const text = "LOADING...";

	return (
		<div className="flex h-full w-full items-center justify-center bg-background">
			<div className="flex space-x-1 overflow-hidden">
				{text.split("").map((char, index) => (
					<motion.span
						key={index}
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "-100%" }}
						transition={{
							duration: 0.5,
							ease: [0.33, 1, 0.68, 1],

							// Cubic bezier for smooth easing
							delay: index * 0.05,
							repeat: Infinity,
							repeatType: "mirror",
							repeatDelay: 1,
						}}
						className="text-4xl font-bold tracking-widest text-foreground md:text-6xl select-none"
						children={char}
					/>
				))}
			</div>
		</div>
	);
}
