import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Fade } from "@/components/fade";



export interface PhilosophyItem {
	label: string;
	description: string;
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
						<p className="text-muted-foreground leading-relaxed text-sm md:text-base">
							{item.description}
						</p>
					</article>
				</Fade>
			))}
		</div>
	);
}
