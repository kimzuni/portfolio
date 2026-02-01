import { createMetadata } from "@/lib/seo";

import { notFound } from "@/contents/404";

import { NotFoundClient } from "./not-found-client";



export const metadata = createMetadata({
	title: "페이지를 찾을 수 없습니다",
	description: "요청하신 페이지를 찾을 수 없습니다.",
});

export default function NotFound() {
	return (
		<NotFoundClient
			{...notFound}
		/>
	);
}
