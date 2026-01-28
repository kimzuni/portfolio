import { createMetadata } from "@/lib/seo";



export const metadata = createMetadata({
	title: "not found",
	description: "not found page",
});



export default function NotFound() {
	return (
		<>
			404 Not Found
		</>
	);
}
