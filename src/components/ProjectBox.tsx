import Media, { ImageProps } from "./Media";
import Link from "./Link";



export interface ProjectBoxProps {
	id: string;
	title: string;
	cover?: ImageProps["src"];
	className?: string;
}

export default function ProjectBox({
	id,
	title,
	cover,
	className="",
}: ProjectBoxProps) {
	return (
		<Link
			to={`/projects/${id}`}
			className={`
				group block overflow-hidden
				bg-theme-bg-light-sub
				shadow-lg rounded-2xl h-64
				scale-100 transition-[scale] hovero:scale-105 focus:scale-105
				${className}
			`.replace(/\s+/g, " ").trim()}
		>
			<Media
				className="object-cover object-center h-full w-full"
				src={cover}
				alt={`project-${title}-thumbnail`}
			/>
			<div
				id={`project-${title}`}
				className={`
					backdrop
					rounded-2xl px-8 h-full
					group-hovero:opacity-100 group-focus:opacity-100
					font-semibold text-xl break-keep text-center
					text-theme-text-dark textBorder-theme-text-light
				`.replace(/\s+/g, " ").trim()}
				children={title}
			/>
		</Link>
	);
}
