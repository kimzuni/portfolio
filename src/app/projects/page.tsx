import { createMetadata } from "@/lib/seo";
import { Link } from "@/components/link";

import { projectsMeta } from "@/contents/projects";



export const metadata = createMetadata({
	title: "프로젝트 목록",
	description: "Projects",
});



export default function Page() {
	return (
		<>
			<p>Projects:</p>
			<ul>
				{
					projectsMeta.map(({ slug, title }) => (
						<li key={slug}>
							<Link
								href={`/projects/${slug}`}
								children={title}
							/>
						</li>
					))
				}
			</ul>
		</>
	);
}
