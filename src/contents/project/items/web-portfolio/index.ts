import type { ItemRaw } from "../types";

import lightSrc from "./hero-light.png";
import darkSrc from "./hero-dark.png";



export const item: ItemRaw = {
	pin: true,
	cover: {
		lightSrc: lightSrc,
		darkSrc: darkSrc,
	},
	title: "Web Portfolio",
	description: [
		"고유한 아이덴티티를 담은 `zuni.kim` 도메인을 기반으로, 기술 스택과 프로젝트를 정돈된 UI로 제안하는 개인 웹 사이트입니다.",
		"Next.js의 Static Export를 활용한 CSR 구조로 빌드되었으며, Tailwind CSS와 shadcn/ui를 통해 직관적이고 일관된 사용자 경험을 구현했습니다.",
		"단순히 이력을 나열하는 것에 그치지 않고 오픈소스 기여 내역 등을 함께 조망하며, 개발 생태계 내에서의 활동 반경을 넓혀가는 과정을 기록합니다.",
	],
	period: [
		new Date("2025-05-08"),
	],
	tags: [
		"frontend",
	],
	skills: [
		"react",
		"typescript",
		"tailwind-css",
		"shadcn-ui",
		"next-js",
	],
	shields: [
		{
			service: "github",
			user: "kimzuni",
			repo: "portfolio",
			badge: "release",
			label: "last release",
		},
	],
	badges: [
		{
			label: "GitHub",
			href: "https://github.com/kimzuni/portfolio",
		},
	],
	articles: [
		{
			blocks: [
				{
					media: {
						type: "image",
						src: "",
						lightSrc,
						darkSrc,
						alt: "메인 페이지 hero 섹션 캡쳐",
					},
					text: [
						"지금 서 있는 곳, 그곳이 바로 이 프로젝트의 시작점이자 결과입니다.",
					],
				},
			],
		},
	],
};
