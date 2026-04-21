import { cn, type MarkdownValue } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { MarkdownBox } from "@/components/markdown-box";
import { Fade } from "@/components/fade";



export interface PhilosophyItem {
	label: string;
	description: MarkdownValue;
}

export interface PhilosophyProps extends Omit<React.ComponentProps<"div">, "children"> {
	items: PhilosophyItem[];
}

export function Philosophy({
	items,
	className,
	...props
}: PhilosophyProps) {
	return (
		<div className={cn("grid gap-8 md:grid-cols-3", className)} {...props}>
			{items.map((item, i) => (
				<Fade
					key={item.label}
					style={{ transitionDelay: `${i * 100}ms` }}
					asChild
				>
					<article className="space-y-2">
						<h3 className="text-xl font-bold text-foreground font-mono">{item.label}</h3>
						<Separator className="bg-primary"/>
						<MarkdownBox
							source={item.description}
							className="text-muted-foreground leading-relaxed text-sm md:text-base"
						/>
					</article>
				</Fade>
			))}
		</div>
	);
}
