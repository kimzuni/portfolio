"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { LinkButton, type LinkButtonProps } from "@/components/link-button";



export interface NotFoundContent {
	messages: string[];
	button: Omit<LinkButtonProps, "href">;
}

export interface NotFoundViewProps extends Omit<React.ComponentProps<"div">, "children">, NotFoundContent {
}

export function NotFoundClient({
	messages,
	className,
	button,
	...props
}: NotFoundViewProps) {
	return (
		<div
			className={cn(
				"container p-0 flex flex-col items-center justify-center gap-6 h-full text-center",
				className,
			)}
			{...props}
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative"
			>
				<h1 className="text-9xl font-black text-transparent bg-clip-text bg-linear-to-r from-primary/20 to-primary/60 select-none">
					404
				</h1>
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="absolute inset-0 flex items-center justify-center"
				>
					<span className="text-2xl font-bold">
						Page Not Found
					</span>
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}
				className="text-muted-foreground text-lg"
				children={messages.map(x => <p key={x} children={x}/>)}
			/>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6, duration: 0.5 }}
				className="mt-4"
			>
				<LinkButton
					href="/"
					{...button}
				/>
			</motion.div>
		</div>
	);
}
