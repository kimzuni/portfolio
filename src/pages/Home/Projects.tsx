import { ScrollFade, Swiper, ProjectBox, Link, Button } from "../../components";
import { projects } from "../../items";

import Section, { SectionProps } from "./Section";



export interface ProjectItem {
	pin?: boolean;
}

export type ProjectsProps = SectionProps;

export default function Projects({
	...props
}: ProjectsProps) {
	const items = projects.filter(x => x[1].pin);
	if (items.length === 0) return undefined;

	return (
		<Section id="projects" {...props} className="overflow-hidden -mt-[20px] pt-[20px]"><ScrollFade className="flex flex-col items-center text-center">
			<p>작지만 소중한 프로젝트들, 앞으로도 계속 채워집니다!</p>
			<p className="mt-6 text-theme-text-dark-sub/75">카드를 누르면 상세 페이지로 이동합니다 {":)"}</p>
			<Swiper
				effect="cards"
				navigation={true}
				pagination={{
					type: "fraction",
				}}
				cardsEffect={{
					slideShadows: false,
				}}
				className="mt-8 mb-12 w-full max-w-130"
				style={{
					"--swiper-pagination-bottom": "-1.6em",
				} as React.CSSProperties}
				items={items}
				render={([id, item]) =>
					<ProjectBox
						id={id}
						title={item.title}
						cover={item.cover ?? item.sections?.find(x => x.media)?.media?.[0].src}
						className={`
							mx-10 h-96! scale-100!
							[&>*]:opacity-100!
							hover:[&_*]:text-theme-primary
							hover:[&_*]:textBorder-transparent
							[&_*]:transition-[color,text-shadow]
							focus:outline-0 focus:border-2 focus:border-theme-primary
						`.replace(/\s+/g, " ").trim()}
					/>
				}
			/>
			<Button
				as={Link}
				to="/projects"
				children="View More"
			/>
		</ScrollFade></Section>
	);
}
