import { notFound } from "next/navigation";

import * as seo from "@/lib/seo";

import { Image } from "@/components/media";

import * as contents from "@/contents";



export type Props = PageProps<"/projects/[project]">;



async function getProjectOrNotFound({ params }: Props) {
	const { project } = await params;
	const slug = decodeURIComponent(project);
	if (!contents.project.has(slug)) {
		return notFound();
	}
	return contents.project.get(slug)!;
}



export async function generateMetadata(props: Props) {
	const data = await getProjectOrNotFound(props);
	return seo.createMetadata({
		title: `${data.title} - 프로젝트`,
		description: data.description.raw,
	})
}



export default async function Project(props: Props) {
	const data = await getProjectOrNotFound(props);

	return (
		<div>
			project: {data.slug}
			<hr/>
			<Image
				{...data.cover}
				alt="cover"
			/>
		</div>
	);
}
