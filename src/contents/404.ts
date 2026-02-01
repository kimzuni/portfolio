import type { NotFoundContent } from "@/app/not-found-client";



export const notFound: NotFoundContent = {
	messages: [
		"앗, 혹시 길을 잃으셨나요?",
		"집으로 안내해 드릴게요!",
	],
	button: {
		label: "저를 따라오세요!",
		size: "lg",
		icon: "Home",
		iconScale: 1.2,
		iconPosition: "right",
	},
};
