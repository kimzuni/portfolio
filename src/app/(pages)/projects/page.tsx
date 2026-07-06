import Link from "next/link";

import * as seo from "@/lib/seo";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.project.metadata);



export default async function Projects() {
	const items = contents.project.itemsByTag;

	return (
		<ul>
			{items.map(({ tag, projects }) =>(
				<li key={tag} className="border-b border-neutral-300 py-2">
					<h2>tag: {tag}</h2>
					<ul>
						{projects.map((project) => (
							<li key={project.slug}>
								- <Link href={`/projects/${project.slug}`}>
									{project.slug}
								</Link>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
}
