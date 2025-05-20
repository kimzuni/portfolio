import type { Item } from "../";

import intro from "./intro.png";



const item: Item = {
	pin: true,
	title: "웹 포트폴리오",
	date: [new Date("2025-05-08")],
	categories: ["Frontend"],
	skills: [
		{ label: "Vite", color: "646CFF", },
		{ label: "React", color: "58c4dc" },
		{ label: "Tailwindcss", color: "38bdf8" },
		{ label: "TypeScript", color: "3178C6" },
	],
	badges: {
		user: "kimzuni",
		repo: "portfolio",
		items: [
			{
				service: "github",
				badge: "lastCommit",
				link: true,
			},
		],
	},
	sections: [
		{
			images: [
				{
					src: intro,
					alt: "home intro",
				},
			],
			description: [
				"개발자로서의 여정을 담은 개인 웹 포트폴리오입니다. 지금까지의 프로젝트와 기술 스택을 정리하고, 앞으로의 성장을 기록합니다.",
				"React와 Typescript 기반으로 제작되었으며, Vite의 빠른 빌드 환경과 Tailwind CSS를 활용하여 반응형 디자인을 적용했습니다.",
			],
		},
	],
};

export default item;
