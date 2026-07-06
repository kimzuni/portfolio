import type { ItemRaw } from "../types";

import dockerLogs from "./docker-logs.png";
import discordServerTest from "./discord-server-test.png";
import discordPlayerLogging from "./discord-player-logging.png";



export const item: ItemRaw = {
	cover: dockerLogs,
	title: "Longvinter 서버용 도커 이미지",
	description: [
		"Longvinter 공식 서버의 ARM 아키텍처 미지원 문제와 수동 운영의 번거로움을 해결하고자",
		"Palworld의 유명 비공식 오픈소스 도커 이미지를 Longvinter 환경에 맞게 재구성하여 배포하였습니다.",
	],
	period: [
		new Date("2024-03-24"),
		new Date("2024-09-02"),
	],
	tags: [
		"container",
		"deployment",
	],
	skills: [
		"bash",
		"docker",
		"github-actions",
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
	articles: [
		{
			blocks: [
				{
					media: {
						type: "image",
						src: dockerLogs,
						alt: "도커 컨테이너 로그",
						caption: "도커 컨테이너 로그",
					},
				},
				{
					text: [
						"Unreal Engine 기반 게임 서버의 공통된 구동 방식을 활용하여, Palworld 비공식 도커 이미지의 구조를 Longvinter 환경에 맞게 포팅했습니다.",
						"베이스 이미지의 검증된 아키텍처를 계승함으로써 ARM64 멀티 아키텍처 지원과 Discord 웹훅 연동 등 강력한 편의 기능을 안정적으로 이식하였으며,",
						"이를 통해 수동 운영의 번거로움을 해결하고 서버 관리 효율을 극대화했습니다.",
					],
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: discordServerTest,
						alt: "서버 생명 주기 이벤트에 대한 디스코드 알림 테스트",
					},
					text: [
						"서버의 생명 주기(설치/업데이트, 시작/종료, 백업/복구 등)에 따른 실시간 디스코드 알림을 제공하며, 각 이벤트의 활성화 여부 및 메시지 내용을 자유롭게 커스텀할 수 있습니다. 실행 중인 컨테이너에 직접 명령을 전달하여 커스텀 브로드캐스트 메시지를 전송하거나 백업 및 복구를 수행할 수 있습니다.",
					],
				},
				{
					media: {
						type: "image",
						src: discordPlayerLogging,
						alt: "플레이어 접속/종료 이벤트에 대한 디스코드 알림",
					},
					text: [
						"RCON 및 REST API를 지원하지 않는 Longvinter 환경에서 사용자 입·퇴장 이벤트를 추적하기 위해, 서버 로그를 주기적으로 감시하여 이벤트를 포착하도록 로그 테일링 방식을 구현하였습니다.",
						"이를 통해 Palworld 이미지와 동일한 수준의 실시간 알림 기능을 제공할 수 있게 되었습니다.",
					],
				},
			],
		},
	],
};
