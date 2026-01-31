import type { ProjectContent } from "../";

import header from "./header.jpg";



export default {
	cover: header,
	title: "Longvinter 서버용 도커 이미지",
	description: "Palworld 서버 Docker 이미지를 기반으로, Longvinter 서버에 맞게 재구성하여 빌드 및 배포하였습니다.",
	period: [
		new Date("2024-03-24"),
		new Date("2024-09-02"),
	],
	tags: [
		"Container",
		"Deployment",
	],
	skills: [
		"Bash",
		"Docker",
		"Github Actions",
	],
	shields: [
		{
			service: "docker",
			badge: "pulls",
			user: "kimzuni",
			repo: "longvinter-docker-server",
		},
	],
	badges: [
		{
			label: "Upstream",
			href: "https://github.com/thijsvanloef/palworld-server-docker",
		},
		{
			label: "GitHub",
			href: "https://github.com/kimzuni/longvinter-docker-server",
		},
		{
			label: "Docker Hub",
			href: "https://hub.docker.com/r/kimzuni/longvinter-docker-server",
		},
	],
	sections: [
		{
			blocks: [
				{
					media: {
						type: "image",
						src: header,
						alt: "Longvinter Official Header",
					},
				},
				{
					lines: [
						[
							"Longvinter에서 공식적으로 제공하는 서버 구동 방법은, 서버 구축부터 운영, 업데이트와 백업까지 모두 수동으로 처리해야 해 실제 운영에 많은 불편함이 있었습니다.",
						],
						[
							"Palworld 서버용 비공식 Docker 이미지를 Longvinter 전용으로 재구성함으로써 기존의 불편함을 해결하였습니다.",
							"게임 서버 설치부터 업데이트, 백업을 자동화할 수 있으며, ARM64 아키텍처 지원, Discord 연동 등 다양한 추가 기능을 제공합니다.",
						],
					],
				},
			],
		},
	],
} satisfies ProjectContent;
