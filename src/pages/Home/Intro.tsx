import { CgScrollV } from "@react-icons/all-files/cg/CgScrollV";

import { Section, SectionProps } from "../../components";



export default function Intro({
	id="intro",
	className="",
	...props
}: SectionProps) {
	return (
		<Section.Component
			id={id}
			className={`
				${className}
				pb-16
				bg-theme-bg-dark text-theme-text-light
				flex flex-col justify-center items-center
				font-extrabold text-center
				text-3xl md:text-4xl

				[&>*]:w-full [&>*]:max-w-160
			`.replace(/\s+/g, " ").trim()}
			{...props}
		>
			<Section.Animation
				className={`
					pt-24
					flex-1 flex flex-col justify-center items-center gap-6

					[&_.gradient]:bg-linear-to-r [&_.gradient]:from-theme-primary [&_.gradient]:to-green-500
					[&_.gradient]:bg-clip-text [&_.gradient]:text-transparent
				`.replace(/\s+/g, " ").trim()}
			>
				<h2
					className={`
						gradient
						text-[1.25em]
					`.replace(/\s+/g, " ").trim()}
					children="KIM JOON HEE"
				/>
				<p
					className="gradient"
					children="Web Portfolio"
				/>
				<p
					className="pt-4 text-xl text-center leading-8"
				>
					Welcome to my Portfolio<br/>
					This is a description
				</p>
			</Section.Animation>
			<Section.Animation
				className={`
					py-8
					flex flex-col justify-center items-center gap-2
					text-theme-text-light-sub/50 text-sm
				`.replace(/\s+/g, " ").trim()}
			>
				<CgScrollV size="36" className="p-1 animate-bounce"/>
				<span>Scroll Down</span>
			</Section.Animation>
		</Section.Component>
	);
}
