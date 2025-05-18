import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { useAnimateInView } from "../hooks";
import { Link, ScrollFade } from "../components";
import { projects } from "../items";



export interface ProjectsProps {
	categories?: string[];
	cover?: string;
}

export default function Projects() {
	const ALL = "ALL";
	const navigate = useNavigate();
	const { search } = useLocation();
	const [isVisible, setIsVisible] = useState(true);
	const ref = useAnimateInView<HTMLDivElement>(isVisible, { duration: "200ms", translateValue: "0px 0px" });

	const categories = [...new Set(projects.map(x => x[1].categories).flat().filter(Boolean))] as string[];
	const { category } = Object.fromEntries(search.slice(1).split("&").map(x => x.split("="))) as Record<string, string>;
	const tab = categories.includes(category) ? category : ALL;
	const items = projects.filter(x => tab === ALL || x[1].categories?.includes(tab)).sort((a, b) => b[1].date.reverse()[0].getTime() - a[1].date.reverse()[0].getTime());
	const panelId = `panel-${tab}`;

	const tabClick = (tab: string) => {
		setIsVisible(false);
		setTimeout(() => {
			navigate(tab === ALL ? "" : { search: `category=${tab}` }, { replace: true })
			setIsVisible(true);
		}, 100);
	}

	return (<>
		<section><ScrollFade className="my-(--section-px)">
			<h2 className="text-2xl font-semibold text-center">Projects</h2>
		</ScrollFade></section>

		<section><ScrollFade>
			<div className="flex flex-wrap px-4" role="tablist" aria-label="project categories">
				{[ALL, ...categories].map(label =>
					<button
						key={label}
						id={label}
						onClick={() => tabClick(label)}
						className={`
							relative block text-theme-text-dark
							rounded-t-lg px-4 py-0.5
							border-1 border-b-0 border-transparent
							hover:border-theme-text-dark-sub/50
							[&.active]:border-theme-text-dark-sub/50
							hover:bg-white [&.active]:bg-white
							[&.active]:pointer-events-none
							transition-[background-color,border-color]
							${tab === label
								? "active before:content-[''] before:absolute before:-bottom-[1px] before:left-0 before:w-full before:border-b-1 before:border-white"
								: ""
							}
						`.replace(/\s+/g, " ").trim()}
						role="tab"
						aria-selected={tab === label}
						aria-controls={panelId}
						tabIndex={tab === label ? -1 : undefined}
						children={label}
					/>
				)}
			</div>
			<div
				id={panelId}
				className={`
					bg-white border-1 border-theme-text-light-sub/20
					shadow-md rounded-2xl p-8
				`.replace(/\s+/g, " ").trim()}
				role="tabpanel"
				aria-labelledby={tab}
			>
				<div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{items.map(([id, item]) =>
						<Link
							key={id}
							to={`/projects/${id}`}
							className={`
								group block overflow-hidden
								shadow-lg rounded-2xl h-64
								bg-no-repeat bg-cover bg-center
								scale-100 transition-[scale] hovero:scale-105
							`.replace(/\s+/g, " ").trim()}
							style={{
								backgroundImage: `url(${item.cover ?? item.sections?.[0].images?.[0].src})`,
							}}
						>
							<div
								id={`project-${item.title}`}
								className={`
									bg-theme-bg-dark-sub/50 h-full
									flex justify-center items-center
									transition-opacity opacity-0 group-hovero:opacity-100
									font-semibold text-xl
									text-theme-text-dark textBorder-theme-text-light
								`.replace(/\s+/g, " ").trim()}
								children={item.title}
							/>
						</Link>
					)}
				</div>
			</div>
		</ScrollFade></section>
	</>);
}
