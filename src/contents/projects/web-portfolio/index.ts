import type { ProjectContent } from "../";

import hero from "./hero.png";



export default {
	pin: true,
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
		"Next.js",
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
						"Next.js 기반으로 제작되었으며, shadcn/ui와 Tailwind CSS를 활용하여 반응형 디자인을 적용했습니다.",
						"Next.js의 정적 내보내기(Static Export) 기능을 활용하여 배포의 편의성을 높였습니다.",
					]],
				},
			],
		},
	],
} satisfies ProjectContent;
