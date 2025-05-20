import type { Item } from "..";



const item: Item = {
	pin: true,
	title: "Longvinter 전용 도커 이미지",
	date: [new Date("2024-03-24")],
	categories: ["Docker"],
	skills: [
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
				badge: "lastCommit",
				link: true,
			},
			{
				service: "docker",
				badge: "pulls",
				logo: "docker",
				link: true,
			},
		],
	},
	sections: [
		{
			images: [
				{
					src: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/1635450/header.jpg",
					alt: "thumb",
				},
			],
			description: [
				"Steam 게임 Palworld용 도커 이미지 소스코드를 Longvinter 게임에 맞게 수정하여 배포하였습니다. 기존 이미지와 마찬가지로 AMD64 및 ARM64 아키텍처를 모두 지원하며, Palworld 관련 코드는 제외하고 Longvinter 전용 코드를 추가하여 완벽한 호환성을 제공합니다.",
			],
		},
	],
};

export default item;
