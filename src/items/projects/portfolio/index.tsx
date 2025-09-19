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
		{ label: "TailwindCSS", color: "38bdf8" },
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
			{
				service: "github",
				badge: "workflow",
				workflow: "release.yml",
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
			descriptions: [
				"개발자로서의 여정을 담은 개인 웹 포트폴리오입니다. 지금까지의 프로젝트와 기술 스택을 정리하고, 앞으로의 성장을 기록합니다.",
				"React와 TypeScript 기반으로 제작되었으며, Vite의 빠른 빌드 환경과 Tailwind CSS를 활용하여 반응형 디자인을 적용했습니다. Swiper, Skill Icons, Shields.io 등 다양한 오픈소스를 활용하여 UI를 구성하고, vite-imagetools로 이미지 최적화를 적용해 성능을 개선했습니다.",
				"GitHub Actions를 통해 릴리즈 시 자동으로 빌드 및 배포되도록 CI/CD 파이프라인을 구성했습니다.",
			],
		},
	],
};

export default item;
