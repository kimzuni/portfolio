import { useRender, mergeProps } from "@base-ui/react";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { MarkdownBox } from "@/components/markdown-box";

import type * as contents from "@/contents";



export interface PhilosophyProps extends Omit<useRender.ComponentProps<"div">, "children">, contents.about.Philosophy {
}

export function Philosophy({
	label,
	description,
	render,
	...props
}: PhilosophyProps) {
	const defaultProps: useRender.ElementProps<"div"> = {
		children: <>
			<h3 className="text-xl font-bold text-foreground font-mono">{label}</h3>
			<Separator className="bg-primary"/>
			<MarkdownBox
				className="prose-base"
				source={description}
			/>
		</>,
	};

	const element = useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(defaultProps, props),
	});

	return element;
}



export interface PhilosophiesProps extends Omit<React.ComponentProps<"div">, "children"> {
	items: contents.about.Philosophy[];
}

export function Philosophies({
	items,
	className,
	...props
}: PhilosophiesProps) {
	return (
		<div className={cn("grid gap-8 lg:grid-cols-3", className)} {...props}>
			{items.map((item) => (
				<Philosophy
					key={item.label}
					className="space-y-2"
					render={<article/>}
					{...item}
				/>
			))}
		</div>
	);
}
