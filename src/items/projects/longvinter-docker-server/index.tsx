import type { Item } from "..";

import header from "./header.jpg";



const item: Item = {
	title: "Longvinter 전용 도커 이미지",
	date: [new Date("2024-03-24"), new Date("2024-09-02")],
	categories: ["Docker"],
	skills: [
		{ label: "Bash", color: "4EAA25", logo: "gnu-bash" },
		{ label: "Discord_Webhook", color: "5865F2", logo: "discord" },
		{ label: "Docker", color: "1D63ED" },
		{ label: "GitHub_Actions", color: "2088FF", logo: "github-actions" },
	],
	badges: {
		user: "kimzuni",
		repo: "longvinter-docker-server",
		logo: "github",
		items: [
			{
				service: "github",
				badge: "lastCommit",
			},
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
				"Palworld용 도커 이미지를 Longvinter 환경에 맞게 수정했습니다. GitHub Actions로 빌드 및 배포, 컨테이너 취약점 스캔을 자동화하고, 발견된 취약점은 가능한 한 패치한 후 배포했습니다.",
				"기존 이미지 그대로 AMD64 및 ARM64 아키텍처를 모두 지원하며, Palworld 전용 기능은 제외하고 Longvinter에 필요한 기능을 구현하여 완벽한 호환성을 제공합니다. Bash 스크립트로 구현된 재부팅, 업데이트, 백업 등 다양한 작업을 직접 실행하거나 Cron 스케줄을 설정해 자동화할 수 있으며, Discord Webhook을 통해 주요 이벤트를 실시간으로 알림받을 수 있습니다.",
			],
		},
	],
};

export default item;
