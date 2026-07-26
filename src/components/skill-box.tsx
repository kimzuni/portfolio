import { useRender, mergeProps } from "@base-ui/react";

import { cn } from "@/lib/utils";

import { Card, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { SkillLevelProvider, SkillLevelBadge } from "@/components/skill-level";
import { SkillIcon, type Provider } from "@/components/skill-icon";
import { LinkBadge } from "@/components/link-badge";
import { Link } from "@/components/link";



export interface CategoryProps extends Omit<useRender.ComponentProps<"div">, "children"> {
	group?: string;
	category?: string;
}

export function Category({
	group,
	category,
	render,
	...props
}: CategoryProps) {
	const defaultProps: useRender.ElementProps<"div"> = {
		className: "flex flex-wrap gap-1",
		children: <>
			<span className="peer empty:hidden">{group}</span>
			<span className="opacity-50 peer-empty:hidden has-[+_:empty]:hidden">•</span>
			<span className="empty:hidden">{category}</span>
		</>,
	};

	const element = useRender({
		defaultTagName: "div",
		render,
		props: mergeProps<"div">(defaultProps, props),
	});

	if (!group && !category) {
		return null;
	}

	return element;
}



export interface SkillBoxLevelItem {
	label: string;
	color: string;
}

export interface SkillBoxItem {
	slug: string;
	group?: string;
	category?: string;
	icon?: string;
	iconProvider?: Provider;
	label: string;
	level: SkillBoxLevelItem;
	projects?: number;
	contributions?: number;
}

export interface SkillBoxProps extends React.ComponentProps<typeof Card>, SkillBoxItem {
}

export function SkillBox({
	slug,
	group,
	category,
	icon,
	iconProvider,
	label,
	level,
	projects,
	contributions,
	className,
	...props
}: SkillBoxProps) {
	return (
		<SkillLevelProvider
			color={level.color}
			render={<Card
				className={cn(
					"overflow-hidden bg-card/40 min-w-xs",
					"transition-all hover:-translate-y-1 hover:ring-(--level-border) *:border-border/40",
					className,
				)}
				{...props}
			>
				<CardContent className="flex gap-4">
					<div data-slot="skill-icon" className="p-2">
						<SkillIcon
							icon={icon}
							label={label}
							level={level.label}
							provider={iconProvider}
							width={40}
							height={40}
						/>
					</div>
					<div className="flex-1 flex flex-col gap-1 h-full">
						<div className="flex-1 flex flex-wrap justify-between items-center-safe gap-2">
							<CardTitle className="flex-1 text-lg font-bold truncate">
								{label}
							</CardTitle>
							<SkillLevelBadge
								label={level.label}
							/>
						</div>
						<Category
							group={group}
							category={category}
							render={<CardDescription/>}
							className="h-full text-xs font-medium"
						/>
					</div>
				</CardContent>

				<CardFooter
					className="border-t not-data-has-count:border-0 not-data-has-count:pt-0! gap-2.5"
					data-has-count={projects !== undefined || contributions !== undefined ? "" : undefined}
				>
					<div
						className={
							cn(
								"flex-1 flex flex-wrap gap-2.5 text-xs",
								"*:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-2",
								"**:data-[field=key]:font-medium **:data-[field=value]:font-semibold",
								"*:[a]:not-hover:*:data-[field=key]:text-muted-foreground/80",
							)
						}
					>
						{projects !== undefined && (
							<Link href={`/projects?skill=${slug}`}>
								<span data-field="key">Projects: </span>
								<span data-field="value">{projects}</span>
							</Link>
						)}
						<span className="opacity-50 first:hidden last:hidden">/</span>
						{contributions !== undefined && (
							<Link href={`/contributions?skill=${slug}`}>
								<span data-field="key">Contrib: </span>
								<span data-field="value">{contributions}</span>
							</Link>
						)}
					</div>
					<LinkBadge
						href={`/skills/${slug}`}
						label="Detailed View"
						icon="ArrowRight"
						iconPosition="right"
						variant="ghost"
						className="hover:text-(--level-text)"
						iconTranslateX={3}
					/>
				</CardFooter>
			</Card>}
		/>
	);
}
