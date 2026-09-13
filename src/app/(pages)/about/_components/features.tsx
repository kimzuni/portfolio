import { cn } from "@/lib/utils";

import { Feature } from "./feature";

import type * as contents from "@/contents";



export interface FeaturesProps extends Omit<React.ComponentProps<"div">, "children"> {
	items: contents.about.Feature[];
}

export function Features({
	items,
	className,
	...props
}: FeaturesProps) {
	return (
		<div className={cn("grid gap-8 lg:grid-cols-3", className)} {...props}>
			{items.map((item) => (
				<Feature
					key={item.label}
					className="space-y-2"
					render={<article/>}
					{...item}
				/>
			))}
		</div>
	);
}
