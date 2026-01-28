import Image from "next/image";
import { notFound } from "next/navigation";

import { createMetadata } from "@/lib/seo";

import { slugs, projectMap } from "@/contents/projects";



export interface Props {
	params: Promise<{ slug: string }>;
}



function getProjectOrNotFound(slug: string) {
	slug = decodeURIComponent(slug);
	if (!slugs.includes(slug)) {
		return notFound();
	}
	return projectMap[slug];
}



export function generateStaticParams() {
	return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	const { title, description, cover } = getProjectOrNotFound(slug);

	return createMetadata({
		title: `프로젝트 - ${title}`,
		description: description,
		cover: cover,
	});
}



export default async function Project({ params }: Props) {
	const { slug } = await params;
	const { title, description, cover } = getProjectOrNotFound(slug);

	return (
		<>
			<p>Project: {slug}</p>
			<p>Description: {description}</p>
			<Image
				src={cover}
				alt={title}
				loading="eager"
				width={128}
			/>
		</>
	);
}
