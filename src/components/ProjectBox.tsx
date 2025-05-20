import Link from "./Link";
import NoImage from "./NoImage";



export interface ProjectBoxProps {
	id: string;
	title: string;
	cover?: string;
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
				shadow-lg rounded-2xl h-64
				bg-no-repeat bg-cover bg-center
				scale-100 transition-[scale] hovero:scale-105 focus:scale-105
				${className}
			`.replace(/\s+/g, " ").trim()}
			style={{
				backgroundImage: `url(${cover})`,
			}}
		>
			{!cover && <NoImage/>}
			<div
				id={`project-${title}`}
				className={`
					bg-theme-bg-dark-sub/75
					rounded-2xl px-8 h-full
					flex justify-center items-center
					transition-opacity opacity-0 group-hovero:opacity-100 group-focus:opacity-100
					font-semibold text-xl break-keep text-center
					text-theme-text-dark textBorder-theme-text-light
				`.replace(/\s+/g, " ").trim()}
				children={title}
			/>
		</Link>
	);
}
