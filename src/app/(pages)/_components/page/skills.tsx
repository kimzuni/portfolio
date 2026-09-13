import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/link-button";
import { SkillIcon } from "@/components/skill-icon";
import { Icon } from "@/components/icon";
import { Heading } from "@/components/heading";

import { Section, type SectionProps } from "./section";
import { Message } from "./message";

import type * as contents from "@/contents";



interface SkillBoxProps extends Omit<React.ComponentProps<typeof Card>, "children">, contents.home.Skill {
}

function SkillBox({
	group,
	items,
	...props
}: SkillBoxProps) {
	return (
		<article className="flex flex-col justify-center-safe">
			<Card {...props}>
				<CardHeader className="flex items-center gap-3">
					<Icon
						icon={group.icon}
						size={24}
						className="text-(--c)"
						style={{
							"--c": group.color ?? "var(--primary)",
						} as React.CSSProperties}
					/>
					<div className="flex-1">
						<CardTitle className="font-mono">{group.label}</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="grid grid-cols-5 gap-2">
					{items.map(props => (
						<SkillIcon
							withTooltip
							key={props.label}
							icon={props.icon}
							label={props.label}
							level={props.level.label}
							provider={props.provider}
							className="place-self-center data-popup-open:scale-125 data-popup-open:-translate-y-1.5 transition-[scale,translate]"
						/>
					))}
				</CardContent>
			</Card>
		</article>
	);
}



export interface SkillsProps extends Omit<SectionProps, "children">, contents.home.Skills {
}

export function Skills({
	heading,
	message,
	linkButton,
	items,
	...props
}: SkillsProps) {
	return (
		<Section {...props}>
			<div className="space-y-4">
				<Heading
					level={2}
					className="text-center"
				>{heading}</Heading>
				<Message
					className="text-center"
				>{message}</Message>
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(auto,350px))] gap-6 justify-center-safe">
				{items.filter(x => x.items.length).map(({ group, items }) => (
					<SkillBox
						key={group.slug}
						group={group}
						items={items}
					/>
				))}
			</div>

			<div className="w-fit mx-auto">
				<LinkButton
					href="/skills/"
					{...linkButton}
				/>
			</div>
		</Section>
	);
}
