import Link from "next/link";

import * as seo from "@/lib/seo";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.home.metadata);



export default async function Home() {
	return (
		<div>
			home
			<hr/>
			<ul>
				<li>- <Link href="/about">about</Link></li>
				<li>- <Link href="/projects">projects</Link></li>
			</ul>
			<hr/>
			<pre>{JSON.stringify(app, null, 2)}</pre>
		</div>
	);
}
