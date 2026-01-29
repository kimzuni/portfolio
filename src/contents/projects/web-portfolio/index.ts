import type { ProjectContent } from "../";

import hero from "./hero.png";



export default {
	cover: hero,
	title: "Web Portfolio",
	description: "개발자로서의 여정을 담은 개인 웹 포트폴리오입니다. 지금까지의 프로젝트와 기술 스택을 정리하고, 앞으로의 성장을 기록합니다.",
	period: [
		new Date("2025-05-08"),
	],
	tags: [
		"Frontend",
	],
	skills: [
		"React",
		"TypeScript",
		"Tailwind CSS",
		"shadcn/ui",
	],
	shields: [
		{
			service: "github",
			user: "kimzuni",
			repo: "portfolio",
			badge: "last-commit",
		},
	],
	badges: [
		{
			label: "GitHub",
			href: "https://github.com/kimzuni/portfolio",
		},
	],
	sections: [
		{
			blocks: [
				{
					media: {
						type: "image",
						src: hero,
						alt: "메인 페이지 hero 섹션 캡쳐",
					},
					lines: [[
						"React와 TypeScript 기반으로 제작되었으며,",
						"Bun 및 Vite의 빠른 빌드 환경과 shadcn/ui 및 Tailwind CSS를 활용하여 반응형 디자인을 적용했습니다.",
					]],
				},
			],
		},
	],
} satisfies ProjectContent;
