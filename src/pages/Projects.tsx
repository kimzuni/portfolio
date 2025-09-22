import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { SEO, ScrollFade, ProjectBox, Icons } from "../components";
import { useAnimateInView } from "../hooks";
import { projects } from "../items";



const Btn = ({
	className="",
	...props
}: React.ComponentPropsWithoutRef<"button">) => {
	return (
		<button
			type="button"
			className={`absolute top-0 h-full w-6 flex justify-center items-center text-xl ${className}`.trim()}
			{...props}
		/>
	);
};



export interface ProjectsProps {
	categories?: string[];
}

const getOffset = (box: Element, btn: Element) => {
	const boxRect = box.getBoundingClientRect();
	const btnRect = btn.getBoundingClientRect();
	return {
		left: Math.round(boxRect.left - btnRect.left),
		right: Math.round(btnRect.right - boxRect.right),
	};
};

export default function Projects() {
	const ALL = "ALL";
	const KEY = "category";
	const navigate = useNavigate();
	const { search } = useLocation();
	const [isVisible, setIsVisible] = useState(true);
	const panelRef = useAnimateInView<HTMLDivElement>(isVisible, { duration: "200ms", translateValue: "0px 0px" });
	const tablistRef = useRef<HTMLDivElement>(null);

	const categories = [...new Set(projects.map(x => x[1].categories).flat().filter(Boolean))] as string[];
	const category = new URLSearchParams(search).get(KEY) ?? ALL;
	const tab = categories.includes(category) ? category : ALL;
	const items = projects.filter(x => tab === ALL || x[1].categories?.includes(tab));
	const panelId = `panel-${tab}`;

	useEffect(() => {
		const box = tablistRef.current;
		const btn = box?.querySelector(`#${tab}`);
		if (!box || !btn) return;

		const handle = () => {
			const { left, right } = getOffset(box, btn);
			if (0 < left) {
				box.scrollTo({ left });
			} else if (0 < right) {
				box.scrollTo({ left: right });
			}
		};

		window.addEventListener("pageshow", handle);
		return () => {
			window.removeEventListener("pageshow", handle);
		};
	}, [tab]);

	const tabClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const node = event.currentTarget;
		const label = node.id;
		node.closest("[role=tablist")?.querySelector(`#${tab}`)?.classList.remove("active");
		node.classList.add("active");
		node.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });

		setIsVisible(false);
		setTimeout(() => {
			navigate(label === ALL ? "" : { search: `${KEY}=${label}` }, { replace: true })
			setIsVisible(true);
		}, 100);
	}

	const arrowClick = (value: "left" | "right") => {
		const box = tablistRef.current;
		if (!box) return;
		const tabs = [...box.querySelectorAll(`button[role=tab]`)];
		if (value === "left") tabs.reverse();
		const find = tabs.find(x => 0 < getOffset(box, x)[value]);
		find?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
	};

	return (<>
		<SEO
			title="프로젝트 목록"
			description="저의 성장 과정이 담긴 프로젝트 목록입니다."
			keywords={["Projects", ...categories]}
			url={{ search: tab === ALL ? "" : `?${KEY}=${tab}` }}
		/>

		<section className="my-(--section-px)">
			<h2 className="text-2xl font-semibold text-center">Projects</h2>
		</section>

		<section><ScrollFade>
			<div className="relative">
				<Btn
					className="left-0"
					aria-label="left scroll"
					children={<Icons.Left/>}
					onClick={() => arrowClick("left")}
				/>
				<Btn
					className="right-0"
					aria-label="right scroll"
					children={<Icons.Right/>}
					onClick={() => arrowClick("right")}
				/>
				<div ref={tablistRef} className="relative top-[1px] flex mx-6 overflow-x-auto overflow-y-hidden scrollbar-hide" role="tablist" aria-label="project categories">
					{[ALL, ...categories].map(label =>
						<button
							key={label}
							id={label}
							onClick={tabClick}
							className={`
								relative block text-theme-text-dark
								rounded-t-lg px-4 py-0.5
								border-1 border-b-0 border-transparent
								hover:border-theme-text-dark-sub/30
								[&.active]:border-theme-text-dark-sub/30
								[&.active]:bg-white
								[&.active]:pointer-events-none
								transition-[background-color,border-color]

								[&.active]:before:content-['']
								[&.active]:before:absolute
								[&.active]:before:-bottom-[2px]
								[&.active]:before:left-0
								[&.active]:before:w-full
								[&.active]:before:border-b-[3px]
								[&.active]:before:border-white
								${tab === label ? "active" : ""}
							`.replace(/\s+/g, " ").trim()}
							role="tab"
							aria-selected={tab === label}
							aria-controls={panelId}
							tabIndex={tab === label ? -1 : undefined}
							children={label}
						/>
					)}
				</div>
			</div>
			<div
				id={panelId}
				className={`
					bg-white border-1 border-theme-text-light-sub/30
					shadow-md rounded-2xl p-8
				`.replace(/\s+/g, " ").trim()}
				role="tabpanel"
				aria-labelledby={tab}
			>
				<div ref={panelRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{items.map(([id, item]) =>
						<ProjectBox
							key={id}
							id={id}
							title={item.title}
							cover={item.cover ?? item.sections?.find(x => x.media)?.media?.[0].src}
						/>
					)}
				</div>
			</div>
		</ScrollFade></section>
	</>);
}
