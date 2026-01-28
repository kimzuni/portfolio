import { createMetadata } from "@/lib/seo";



export const metadata = createMetadata({
	title: "About Me",
	description: "About page",
});

export default function Page() {
	return (
		<>
			About page
		</>
	);
}
