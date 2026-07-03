import * as seo from "@/lib/seo";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.about.metadata);



export default async function About() {
	const data = contents.about.item;

	return (
		<div>
			about
			<hr/>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
