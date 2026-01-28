import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { SkillIcon, type SkillIconOptions } from "@/components/skill-icon";
import { Icon, type IconName } from "@/components/icon";
import { Fade } from "@/components/fade";

import { Section, type SectionProps } from "./section";



export interface SkillIconItem extends SkillIconOptions {
	hidden?: boolean;
}

export interface SkillGroupData {
	icon: IconName;
	hidden?: boolean;
	description?: string;
	items: SkillIconItem[];
}



type SkillBoxProps =
	& Omit<React.ComponentProps<typeof Card>, "children">
	& SkillGroupData
	& { category: string };

function SkillCard({
	category,
	icon,
	items,
	description,
	hidden: _hidden,
	...props
}: SkillBoxProps) {
	if (items.every(x => x.hidden)) return;

	return (
		<article>
			<Card {...props}>
				<CardContent className="flex items-center gap-3">
					<Icon icon={icon} size={24} className="text-primary"/>
					<div className="flex-1">
						<CardTitle className="font-mono">{category}</CardTitle>
						<CardDescription className="empty:hidden pt-2">{description}</CardDescription>
					</div>
				</CardContent>
				<CardContent className="grid grid-cols-5 gap-2">
					{items.filter(x => !x.hidden).map(props => (
						<SkillIcon
							key={props.label}
							icon={props.icon}
							label={props.label}
							provider={props.provider}
							className="place-self-center hover:scale-125 hover:-translate-y-1.5 transition-[scale,translate]"
						/>
					))}
				</CardContent>
			</Card>
		</article>
	);
}



export interface HomeSkillsData {
	heading: string;
	message: string;
	items: Record<string, SkillGroupData>;
}

export interface SkillsProps extends Omit<SectionProps, "children">, HomeSkillsData {
}

export function Skills({
	heading,
	message,
	items,
	...props
}: SkillsProps) {
	return (
		<Section {...props}>
			<Fade className="space-y-4">
				<h2
					className="title text-center"
					children={heading}
				/>
				<p
					className="message text-center"
					children={message}
				/>
			</Fade>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(auto,350px))] gap-6 justify-center">
				{Object.entries(items).filter(x => !x[1].hidden || !x[1].items.find(x => !x.hidden)).map(([category, props], i) => (
					<Fade
						key={category}
						style={{ transitionDelay: `${i * 100}ms` }}
						asChild
					>
						<SkillCard
							category={category}
							{...props}
						/>
					</Fade>
				))}
			</div>
		</Section>
	);
}
