import type { Item } from "..";

import header from "./header.jpg";



const item: Item = {
	pin: true,
	title: "Longvinter 전용 도커 이미지",
	date: [new Date("2024-03-24")],
	categories: ["Docker"],
	skills: [
		{ label: "GitHub_Actions", color: "2088FF", logo: "github-actions" },
		{ label: "Docker", color: "1D63ED" },
		{ label: "Bash", color: "4EAA25", logo: "gnubash" },
		{ label: "Discord_Webhook", color: "5865F2", logo: "discord" },
	],
	badges: {
		user: "kimzuni",
		repo: "longvinter-docker-server",
		logo: "github",
		items: [
			{
				service: "badge",
				badge: "source-upstream-5cc9ff",
				logo: "github",
				link: "https://github.com/thijsvanloef/palworld-server-docker",
			},
			{
				service: "github",
				badge: "stars",
				link: true,
			},
			{
				service: "docker",
				badge: "pulls",
				logo: "docker",
				link: true,
			},
			{
				service: "github",
				badge: "lastCommit",
			},
		],
	},
	sections: [
		{
			media: [
				{
					src: header,
					alt: "Longvinter 메인 헤더 = 출처: https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1635450/header.jpg",
					loading: "eager",
					fetchPriority: "high",
				},
			],
			descriptions: [
				"Steam 게임인 Palworld용 도커 이미지 소스코드를 Longvinter에 맞게 수정하여 배포했습니다.",
				"기존 이미지와 마찬가지로 AMD64 및 ARM64 아키텍처를 모두 지원하며, Palworld 관련 기능은 제외하고 Longvinter에 필요한 기능을 구현하여 완벽한 호환성을 제공합니다.",
				"CVE 등 취약점을 고려하여 보안을 강화했으며, GitHub Actions를 활용해 빌드 및 배포를 자동화했습니다.",
			],
		},
	],
};

export default item;
