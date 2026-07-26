import { useRender, mergeProps } from "@base-ui/react";

import { Separator } from "@/components/ui/separator";
import { ContentBox } from "@/components/content-box";

import type * as contents from "@/contents";



export interface FeatureProps extends Omit<useRender.ComponentProps<"div">, "children">, contents.about.Feature {
}

export function Feature({
	label,
	description,
	render,
	...props
}: FeatureProps) {
	const defaultProps: useRender.ElementProps<"div"> = {
		children: <>
			<h3 className="text-xl font-bold text-foreground font-mono">{label}</h3>
			<Separator className="bg-primary"/>
			<ContentBox className="prose-base">
				{description.result}
			</ContentBox>
		</>,
	};

	const element = useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(defaultProps, props),
	});

	return element;
}
