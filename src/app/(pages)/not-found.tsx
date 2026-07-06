import { cn } from "@/lib/utils";
import * as seo from "@/lib/seo";

import { Motion } from "@/components/motion";
import { LinkButton } from "@/components/link-button";
import { MarkdownBox } from "@/components/markdown-box";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.notFound.metadata);



export default async function NotFound() {
	const {
		messages,
		button,
	} = contents.notFound.item;

	return (
		<div
			className={cn(
				"page-content p-0 h-full text-center",
				"flex flex-col items-center justify-center gap-6",
			)}
		>
			<Motion
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative"
			>
				<h1 className="text-9xl font-black text-transparent bg-clip-text bg-linear-to-r from-primary/20 to-primary/60 select-none">
					404
				</h1>
				<Motion
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
					className="absolute inset-0 flex items-center justify-center"
				>
					<span className="text-2xl font-bold">
						Page Not Found
					</span>
				</Motion>
			</Motion>

			<Motion
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}
				className="text-muted-foreground text-lg"
			>
				<MarkdownBox source={messages}/>
			</Motion>

			<Motion
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6, duration: 0.5 }}
				className="mt-4"
			>
				<LinkButton
					href="/"
					{...button}
				/>
			</Motion>
		</div>
	)
}
