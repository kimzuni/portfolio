"use client";

import { useEffect, useRef, useState } from "react";

import { ProjectBox } from "@/components/project-box";

import type { ItemMetadata } from "../page";

import type * as contents from "@/contents";



export interface ProjectGridProps {
	projects: contents.project.Item[];
	activeTags?: ItemMetadata[];
	activeSkills?: ItemMetadata[];
	pageSize?: number;
	fallback: React.ReactNode;
}

export function ProjectGrid({
	projects,
	activeTags,
	activeSkills,
	pageSize = 12,
	fallback,
}: ProjectGridProps) {
	const [visibleCount, setVisibleCount] = useState(pageSize);
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const target = sentinelRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) {
				setVisibleCount(count => {
					if (count >= projects.length) return count;
					return Math.min(count + pageSize, projects.length);
				});
			}
		}, { rootMargin: "600px 0px" });

		observer.observe(target);
		return () => observer.disconnect();
	}, [projects.length, pageSize]);

	const visibleProjects = projects.slice(0, visibleCount);

	return (
		<>
			{visibleProjects.map(project => (
				<ProjectBox
					{...project}
					key={project.slug}
					activeTags={activeTags}
					activeSkills={activeSkills}
				/>
			))}
			{visibleCount < projects.length && (
				<div ref={sentinelRef} className="col-span-full h-px" aria-hidden/>
			)}
			{!visibleProjects.length && (
				<p className="text-center">
					{fallback}
				</p>
			)}
		</>
	);
}
