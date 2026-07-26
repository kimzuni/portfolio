import type { ItemRaw } from "../types";

import dockerLogs from "./docker-logs.png";
import discordServerTest from "./discord-server-test.png";
import discordPlayerLogging from "./discord-player-logging.png";



export const item: ItemRaw = {
	cover: dockerLogs,
	name: "Longvinter 서버용 도커 이미지",
	description: `
		컨테이너 환경에서 Longvinter 서버를 구동할 수 있는 도커 이미지입니다.
		Longvinter 공식 이미지의 ARM 아키텍처 미지원 문제와 수동 운영의 번거로움을 해결하고자,
		Palworld의 유명 비공식 오픈소스 도커 이미지를 Longvinter 환경에 맞게 재구성하여 배포하였습니다.
	`,
	highlights: [
		{
			label: "AMD64/ARM64 Support",
			value: "멀티 아키텍처 지원",
		},
		{
			label: "Automated Operations",
			value: "서버 설치/업데이트, 시작/종료, 백업/복구 등 자동화 및 수동 명령어 지원",
		},
		{
			label: "Discord Webhook",
			value: "서버 생명 주기 및 플레이어 접속/종료 이벤트에 대한 실시간 디스코드 알림 제공",
		},
	],
	period: [
		new Date("2024-03-24"),
		new Date("2024-09-02"),
	],
	tags: [
		"container",
		"open-source",
		"published",
	],
	skills: {
		primary: [
			"bash",
			"docker",
		],
		secondary: [
			"github-actions",
		],
	},
	shields: [
		{
			service: "docker",
			badge: "pulls",
			user: "kimzuni",
			repo: "longvinter-docker-server",
		},
	],
	links: [
		{
			label: "GitHub",
			href: "https://github.com/kimzuni/longvinter-docker-server",
		},
		{
			label: "Docker Hub",
			href: "https://hub.docker.com/r/kimzuni/longvinter-docker-server",
		},
		{
			label: "Upstream",
			href: "https://github.com/thijsvanloef/palworld-server-docker",
		},
	],
	articles: [
		{
			maxWidth: 850,
			blocks: [
				{
					media: {
						type: "image",
						src: dockerLogs,
						alt: "컨테이너 로그",
						caption: "가독성 높은 컨테이너 로그 출력",
					},
					text: `
						Palworld의 유명 비공식 오픈소스 도커 이미지를 Longvinter 환경에 맞게 포팅하여,
						AMD64 및 ARM64 멀티 아키텍처 지원과 Discord 웹훅 연동 등 강력한 편의 기능을 안정적으로 지원합니다.
						이를 통해 수동 운영의 번거로움을 해결하고 서버 관리 효율을 향상시켰습니다.

						서버 설치부터 업데이트, 백업 등 다양한 작업의 자동화를 지원하며,
						각 작업의 활성화 여부 및 세부 설정뿐만만 아니라 인게임 설정까지 환경 변수를 통해 자유롭게 커스텀할 수 있습니다.
					`,
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: discordServerTest,
						alt: "서버 생명 주기 이벤트에 대한 디스코드 알림 테스트 결과",
						caption: "이벤트별 색상 구분으로 가독성을 높인 디스코드 알림",
					},
					text: `
						서버의 생명 주기(설치/업데이트, 시작/종료, 백업/복구 등)에 따른 실시간 디스코드 알림을 제공합니다.
						실행 중인 컨테이너에 직접 명령을 전달하여 커스텀 브로드캐스트 메시지를 전송하거나 백업 및 복구를 수행할 수 있습니다.
					`,
				},
				{
					media: {
						type: "image",
						src: discordPlayerLogging,
						alt: "플레이어 접속 및 종료 이벤트에 대한 디스코드 알림",
						caption: "실제 운영 중인 서버에서 플레이어 접속 및 종료 이벤트를 감지하여 전송된 디스코드 알림",
					},
					text: `

						RCON 및 REST API를 지원하지 않는 Longvinter 환경에서 원본 이미지와 동일한 수준의 실시간 알림 기능을 제공하기 위해
						로그 테일링 방식을 활용해 서버 로그를 주기적으로 감시하고 플레이어 접속 및 종료 이벤트를 감지하여 디스코드 알림을 전송합니다.
					`,
				},
			],
		},
	],
};
