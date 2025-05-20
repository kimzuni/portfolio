import { ScrollFade, Img } from "../../components";
import { useIsInViewport } from "../../hooks";

import Section, { SectionProps } from "./Section";



export interface Card {
	label: string;
	icon?: string;
	level: "high" | "medium" | "low";
}

export interface SkillsItem {
	title: string;
	cards: Card[];
}

export interface CardProps extends React.ComponentPropsWithoutRef<"div">, Card {
}

export const Card = ({
	label,
	icon,
	level,
	className="",
	...props
}: CardProps) => {
	icon = icon ?? label.toLowerCase().replace(/\./g, "");

	return (
		<div className={`relative size-16 hovero:scale-125 hovero:[&_.card]:opacity-100 transition-[scale] ${className}`.trim()} {...props}>
			<div
				data-level={level}
				className={`
					card
					absolute h-full w-full
					bg-black/50 rounded-[24%]
					transition-[opacity] opacity-0
					flex justify-center items-center
					text-sm capitalize textBorder-theme-text-dark
					before:content-[attr(data-level)]
					${{
						high: "text-green-500",
						medium: "text-yellow-300",
						low: "text-white",
					}[level]}
				`.replace(/\s+/g, " ").trim()}
			/>
			<Img className="size-full" alt={label} aria-label={`lavel: ${level}`} src={`https://skillicons.dev/icons?i=${icon}`}/>
			<p className="flex justify-center">{label}</p>
		</div>
	);
};



export interface SkillsProps extends SectionProps {
	items: SkillsItem[];
}

export default function Skills({
	items=[],
	className="",
	...props
}: SkillsProps) {
	const [ref, isInViewport] = useIsInViewport<HTMLParagraphElement>();

	return (
		<Section id="skills" className={`${className} flex flex-col gap-12 text-center`.trim()} {...props}>
			<ScrollFade>
				저는 이런 것들을 다룰 줄 알아요!<br/>
				작은 프로젝트라도 진행한 것들만 모아봤어요!
			</ScrollFade>
			<ScrollFade>
				<p
					ref={ref}
					className="text-theme-text-dark/25 animate-pulse"
					style={{
						animationPlayState: isInViewport ? "running" : "paused",
					}}
					children="각 스킬에 마우스를 올리거나 터치해 보세요!"
				/>
			</ScrollFade>
			{items.map(({title, cards}) => <ScrollFade key={title} className="mb-[1.6em]">
				<h2 className="title break-all">{title}</h2>
				<div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-12 px-(--section-px)">
					{cards.map(card => <Card key={card.label} {...card}/>)}
				</div>
			</ScrollFade>)}
		</Section>
	);
}
