import { createMetadata } from "@/lib/seo";

import { page } from "@/contents/projects";

import Client from "./client";


export const metadata = createMetadata({
	title: page.heading,
	description: page.heading,
});



export default function Page() {
	return <Client {...page}/>;
}
