import type { ItemRaw } from "../types";

import n25 from "./n25.png";
import panel from "./panel.png";
import externalAddress from "./external-address.png";
import api from "./docker-api.png";

const play = "play.webm";
const forkComparison = "fork-comparison.webm";



export const item: ItemRaw = {
	pin: true,
	cover: n25,
	name: "LLM 에이전트 기반 모의 침투 테스트 시스템",
	description: `
		LLM 에이전트를 활용하여 웹 서버의 취약점을 자동으로 탐지하고 패치 방법을 제안하는 자율형 모의 침투 테스트 시스템입니다.
		실제 공격 발생 전 위험을 사전에 차단하고, 보안 연구 및 교육에 필요한 실전 데이터 부족 문제를 함께 해결하고자 개발했습니다.
	`,
	highlights: [
		{
			label: "Autonomous Agents",
			value: "자율형 LLM 에이전트 기반 모의 침투 테스트 시스템",
		},
		{
			label: "Target Validation",
			value: "공격 대상 서버의 사설 IP 대역 검증 로직 적용으로 악용 및 오용 방지",
		},
		{
			label: "Local LLM Integration",
			value: "Ollama 기반 사용자 지정 로컬 LLM 연동으로 프라이빗 환경 제공",
		},
		{
			label: "Container Image",
			value: "전용 컨테이너 이미지 배포 및 편의를 위한 쉘 스크립트(실행, API 조회 등) 제공",
		},
	],
	period: [
		new Date("2024-09-02"),
		new Date("2024-12-04"),
	],
	tags: [
		"frontend",
		"backend",
		"container",
	],
	skills: {
		primary: [
			"python",
			"django",
			"html",
			"bootstrap",
			"javascript",
			"bash",
			"docker",
			"phaser",
			"tiled",
		],
		secondary: [
			"ollama",
			"github-actions",
			"chart-js",
		],
	},
	team: {
		size: 2,
		contributions: [
			{
				label: "Frontend",
				percentage: 100,
				description: [
					"UI/UX 설계 및 구현",
					"Phaser 구조 리팩토링 및 Tiled 기반 커스텀 맵 제작",
					"사용자 및 테스트 목록 관리를 위한 관리 페이지 구현",
				],
			},
			{
				label: "Backend (Web)",
				percentage: 100,
				description: [
					"Django 기반 사용자 권한 관리 시스템 구축",
					"모의 침투 테스트 데이터 조회를 위한 REST API 구현",
					"사용자 및 테스트 목록 제어를 위한 RBAC 기반 REST API 구현",
				],
			},
			{
				label: "Deployment & Infra",
				percentage: 100,
				description: [
					"전용 컨테이너 이미지 개발 및 Ollama 연동 멀티 컨테이너 환경 구성",
					"데모 시연을 위한 라이브 서버 배포 및 운영",
				],
			},
			{
				label: "Backend (Engine)",
				percentage: 10,
				description: [
					"백엔드 단독 실행을 위한 프론트엔드 의존성 제거",
					"공격 대상 서버의 사설 IP 대역 검증 로직 구현",
				],
			},
			{
				label: "AI Engineering",
				percentage: 0,
			},
		],
	},
	links: [
		{
			label: "GitHub",
			href: "https://github.com/JustPersona/generative-agents",
		},
		{
			label: "GitHub(Image)",
			href: "https://github.com/JustPersona/generative-agents-docker",
		},
		{
			label: "Forked from",
			href: "https://github.com/joonspk-research/generative_agents",
		},
	],
	articles: [
		{
			blocks: [
				{
					colSpan: 2,
					media: {
						type: "image",
						src: n25,
						alt: "커스텀 맵 전체 이미지",
						caption: "Tiled로 제작한 커스텀 맵 전체 화면",
					},
				},
				{
					colSpan: 3,
					media: {
						type: "video",
						src: forkComparison,
						caption: "원본과 프로젝트 결과물의 웹 UI 비교 영상",
					},
					text: `
						단순 서버 상태만 알려주던 메인 페이지를, 모의 침투 테스트 결과와 데이터를 한눈에 확인하고 시각화할 수 있는 대시보드로 구축했습니다.
						또한 다양한 조작이 불편했던 시뮬레이션 페이지에 스텝 이동, 속도 조절, 컨트롤러 등 오직 마우스만으로 디테일한 조작이 가능하도록 개선했습니다.
					`,
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: panel,
						alt: "발표 시 사용된 판넬의 Result 섹션",
						caption: "프로젝트 핵심 기능, 대시보드, 재생 페이지에 대한 간단 설명",
					},
				},
				{
					media: {
						type: "video",
						src: play,
						caption: "모의 침투 테스트 중 취약점을 발견한 상황",
					},
				},
			],
		},
		{
			linkedToPrevious: true,
			blocks: [
				{
					text: `
						대시보드에서는 진행된 테스트에 대한 요약 정보를 확인할 수 있습니다.
						진행된 모의 침투 테스트 목록과 함께 URL 및 공격 유형별로 요약된 통계 정보를 제공하며,
						각 테스트별로 상세 정보를 확인할 수 있습니다.
						또한 재생 페이지에서는 화면 조작 뿐만 아니라
						화면에 해당하는 각 에이전트의 상태 및 행동,
						생성된 공격 페이로드와 성공 여부,
						해당 취약점에 대한 패치 제안 등의
						상세 내용을 확인할 수 있도록 개선했습니다.
					`,
				},
			],
		},
		{
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "image",
						src: externalAddress,
						alt: "서버 공격 대상 검증 테스트",
						caption: "공격 대상 서버로 외부로 연결되는 호스트를 입력하여 백엔드 프로세스가 종료됨",
					},
				},
			],
		},
		{
			linkedToPrevious: true,
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "image",
						src: api,
						alt: "docker 명령어 활용 REST API 조회 결과",
						caption: "컨테이너에 내장된 API 조회 스크립트를 활용하여 REST API 결과 조회",
					},
				},
			],
		},
		{
			linkedToPrevious: true,
			maxWidth: 1100,
			blocks: [
				{
					text: `
						모의 침투 테스트 환경을 쉽게 구성할 수 있도록 전용 컨테이너 이미지를 제공하여,
						이를 활용해 Ollama 연동 기반 멀티 컨테이너 환경을 손쉽게 구축할 수 있습니다.
						또한 컨테이너 쉘에 직접 연결하지 않고 즉시 주요 서비스를 실행할 수 있도록 내장 스크립트를 제공합니다.
						이를 통해 REST API 기반 테스트 결과 조회, 백엔드 프로세스 실행 등 주요 서비스를 간편하게 실행할 수 있습니다.
					`,
				},
			],
		},
	],
};
