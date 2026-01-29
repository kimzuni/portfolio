import type { ProjectContent } from "../";

import n25 from "./n25.png";
import dashboard from "./dashboard.png";
import api from "./docker-api.gif";
import play from "./play.gif";

const forkComparison = "/videos/fork-comparison.mp4";



export default {
	cover: n25,
	title: "LLM을 활용한 해킹 공격 및 방어 시뮬레이션 환경 구축",
	description: [
		"Generative Agents를 포크하여 AI 에이전트들의 행동에 대응하는 상태 정보와 결과 데이터를 한 눈에 파악할 수 있는 대시보드를 제작하였습니다.",
		"또한 시뮬레이션 환경을 쉽게 구축하고 관리할 수 있는 전용 컨테이너 이미지를 개발 및 배포하였습니다.",
	],
	period: [
		new Date("2024-09-02"),
		new Date("2024-12-04"),
	],
	tags: [
		"Frontend",
		"Backend",
		"Container",
	],
	skills: [
		"Django",
		"Bootstrap",
		"Bash",
		"Docker",
		"Ollama",
		"Phaser",
		"Tiled",
		"Github Actions",
	],
	team: {
		size: 2,
		contributions: [
			{
				label: "Frontend",
				percentage: 100,
				description: "API를 활용한 전반적인 웹 페이지 제작",
			},
			{
				label: "Backend",
				percentage: 100,
				description: "데이터 가공 및 API 설계 및 개발",
			},
			{
				label: "DevOps/Infra",
				percentage: 100,
				description: "전용 도커 이미지 제작 및 CI/CD 파이프라인 구축 / 개발 서버 운영 및 관리",
			},
			{
				label: "AI",
				percentage: 0,
			},
		],
	},
	badges: [
		{
			label: "Forked from",
			href: "https://github.com/joonspk-research/generative_agents",
		},
		{
			label: "GitHub",
			href: "https://github.com/JustPersona/generative-agents",
		},
		{
			label: "GitHub(Docker Image)",
			href: "https://github.com/JustPersona/generative-agents-docker",
		},
	],
	sections: [
		{
			blocks: [
				{
					colSpan: 2,
					media: {
						type: "image",
						src: n25,
						alt: "커스텀 맵 전체 이미지",
					},
					lines: [[
						"AGI를 목표로 한 프로젝트 방향에 맞추어, AI 에이전트들이 실제 해킹 공격 및 방어 상황을 연출할 수 있도록 커스텀 맵을 제작하였습니다.",
					]],
				},
				{
					colSpan: 3,
					media: {
						type: "video",
						src: forkComparison,
					},
					lines: [[
						"기존 프로젝트는 단순 플레이 기능만 제공되었으며, URL을 직접 입력해야 접근할 수 있었습니다.",
						"접근성 및 사용성을 개선하기 위해 메인 페이지에 대시보드를 만들고, 플레이 시 디테일한 조작이 가능하도록 기능을 구현하였습니다.",
					]],
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: dashboard,
						alt: "대시보드 전체 이미지 (light/dark 모드)",
					},
					lines: [[
						"대시보드에서는 진행된 시뮬레이션 목록과 함께, 탐지된 취약점을 URL 및 공격 유형별 지표로 제공합니다.",
					]],
				},
				{
					media: {
						type: "image",
						src: play,
						alt: "시뮬레이션 플레이 (GIF)",
					},
					lines: [[
						"결과에 대한 상세 정보는 대시보드에서 제공되는 모달과 플레이 페이지에서 확인할 수 있습니다.",
					]],
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: api,
						alt: "docker 명령어로 API 조회 (GIF)",
					},
					lines: [[
						"전용 도커 이미지를 통해 서버를 쉽게 구성할 수 있으며, 프론트엔드, 백엔드, API 조회 등 주요 서비스를 손쉽게 실행할 수 있습니다.",
					]],
				},
			],
		},
	],
} satisfies ProjectContent;
