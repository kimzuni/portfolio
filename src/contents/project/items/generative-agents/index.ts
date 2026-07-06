import type { ItemRaw } from "../types";

import n25 from "./n25.png";
import panel from "./panel.png";

const play = "play.webm";
const api = "docker-api.webm";
const externalAddress = "external-address.webm";
const forkComparison = "fork-comparison.webm";



export const item: ItemRaw = {
	pin: true,
	cover: n25,
	title: "LLM 기반 해킹 공격 및 방어 시뮬레이션 플랫폼",
	description: [
		"'Generative Agents' 프로젝트를 포크하여,",
		"LLM 에이전트 간의 자율적인 사이버 공격 및 방어 시나리오를 통해 웹 서버의 취약점을 탐지하고 패치 제안을 생성하는 시뮬레이션 환경을 구축하였습니다.",
		"시뮬레이션 전 과정에서 생성되는 모든 데이터를 수집하여 통계 요약 및 상세 로그를 제공하며,",
		"Ollama 연동형 Docker 컨테이너화를 통해 로컬 GPU 자원을 활용한 독립적이고 이식성 높은 시뮬레이션 인프라를 구현하였습니다.",
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
	skills: [
		"django",
		"bootstrap",
		"bash",
		"docker",
		"ollama",
		"phaser",
		"tiled",
		"github-actions",
	],
	team: {
		size: 2,
		contributions: [
			{
				label: "Backend (Web)",
				percentage: 100,
				description: [
					"Django 기반 사용자 권한 관리 시스템 구축 및 시뮬레이션 데이터 조회용 API 구현",
				],
			},
			{
				label: "DevOps/Infra",
				percentage: 100,
				description: [
					"Docker 기반 서비스 컨테이너화 및 Ollama 연동형 멀티 컨테이너 환경 구축",
				],
			},
			{
				label: "Frontend",
				percentage: 100,
				description: [
					"전반적인 UI/UX 설계 및 구현",
					"Phaser 구조 리펙토링 및 커스텀 맵 제작",
				],
			},
			{
				label: "AI Engineering",
				percentage: 0,
				description: [
					"자율형 에이전트 구현을 위한 멀티 스텝 프롬프트 설계 및 공격/방어 시나리오 생성",
				],
			},
			{
				label: "Backend (AI)",
				percentage: 0,
				description: [
					"의사결정 로직과 시뮬레이션 환경 간의 인터페이스 구축 및 행동 자동화 스크립트 구현",
				],
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
	articles: [
		{
			blocks: [
				{
					colSpan: 2,
					media: {
						type: "image",
						src: n25,
						alt: "커스텀 맵 전체 이미지",
						caption: "Tiled로 제작한 커스텀 맵 전체 이미지",
					},
					text: [
						"AGI를 목표로 한 프로젝트 방향에 맞추어, AI 에이전트들이 실제 해킹 공격 및 방어 상황을 연출할 수 있도록 커스텀 맵을 제작하였습니다.",
					],
				},
				{
					colSpan: 3,
					media: {
						type: "video",
						src: forkComparison,
					},
					text: [
						"기존 프로젝트는 단순 시뮬레이션 재생 기능과 방향키 조작만 지원하였으며, 시뮬레이션 재생, 스텝 이동, 속도 조절 등을 위해서는 URL을 직접 입력해야 하는 불편함이 있었습니다.",
						"접근성 및 사용성을 개선하기 위해 대시보드를 만들고, 시뮬레이션 재생 시에는 마우스 이벤트와 주변 컨트롤러를 통해 디테일한 조작이 가능하도록 구현하였습니다.",
					],
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: panel,
						alt: "판넬 Result 섹션 캡쳐본",
					},
				},
				{
					media: {
						type: "video",
						src: play,
					},
				},
			],
		},
		{
			blocks: [
				{
					text: [
						"대시보드에는 진행된 시뮬레이션 목록과 함께 탐지된 취약점과 생성된 패치 제안, URL 및 공격 유형별로 요약된 통계 정보가 제공됩니다.",
						"또한 시뮬레이션별 모달을 통해 시뮬레이션 결과에 대한 상세 정보와 시뮬레이션 재생 페이지로 이동할 수 있도록 구현하였습니다.",
						"재생 페이지에서는 재생 중인 화면에 대응하는 데이터를 실시간으로 표시합니다.",
					],
				},
			],
		},
		{
			blocks: [
				{
					colSpan: 3,
					media: {
						type: "video",
						src: api,
					},
					text: [
						"전용 도커 이미지를 통해 서버를 쉽게 구성할 수 있으며, 프론트엔드, 백엔드, API 조회 등 주요 서비스를 손쉽게 실행할 수 있습니다.",
					],
				},
				{
					colSpan: 2,
					media: {
						type: "video",
						src: externalAddress,
					},
					text: [
						"AI 에이전트들은 지정된 웹 서버에 대해서만 공격 및 방어 시나리오를 수행하도록 설계되어 있으며,",
						"공격 대상 서버를 내부 네트워크로 제한하여 보안성을 강화하였습니다.",
					],
				},
			],
		},
	],
};
