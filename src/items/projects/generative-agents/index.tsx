import type { Item } from "../";

import n25 from "./n25.png";
import dashboard from "./dashboard.png";
import forkComparison from "./fork-comparison.mp4";
import api from "./docker-api.gif";
import play from "./play.gif";
import modal from "./modal.png";



const item: Item = {
	pin: true,
	title: "LLM을 활용한 해킹 공격 및 방어 시뮬레이션 환경 구축",
	team: 2,
	date: [new Date("2024-09-02"), new Date("2024-12-04")],
	categories: ["Frontend", "Backend", "Docker"],
	contribution: [
		{ label: "Frontend", percentage: 100 },
		{ label: "Backend", percentage: 100 },
		{ label: "Infra", percentage: 100 },
		{ label: "AI", percentage: 0 },
	],
	skills: [
		{ label: "Bootstrap", color: "7952b3" },
		{ label: "Bash", color: "4EAA25", logo: "gnu-bash" },
		{ label: "Chart.js", color: "FF6384" },
		{ label: "Django", color: "092E20" },
		{ label: "Docker", color: "1D63ED" },
		{ label: "GitHub_Actions", color: "2088FF", logo: "github-actions" },
		{ label: "Ollama", color: "black" },
		{ label: "Phaser", color: "b6e5f8", },
	],
	badges: {
		user: "JustPersona",
		repo: "generative-agents",
		items: [
			{
				service: "github",
				badge: "license",
				logo: undefined,
			},
			{
				service: "badge",
				badge: "source-forked_from-5cc9ff",
				logo: "github",
				link: "https://github.com/joonspk-research/generative_agents",
			},
			{
				service: "github",
				badge: "stars",
				link: true,
			},
			{
				repo: "generative-agents-docker",
				service: "github",
				badge: "workflow",
				workflow: "build.yml",
				provider: "shield",
				label: "build",
				logo: "docker",
				link: true,
			},
		],
	},
	sections: [
		{
			media: [
				{
					src: n25,
					alt: "Hacker Ville",
					loading: "eager",
					fetchPriority: "high",
				},
				{
					src: dashboard,
					alt: "main dashboard",
				},
			],
			descriptions: [
				"원본 프로젝트인 Generative Agents를 포크하여 해킹 공격 및 방어 시뮬레이션을 구현했습니다. AI 에이전트는 지정한 웹 서버에 대한 해킹 공격과 방어 시나리오를 자동으로 생성 및 수행하고, 탐지된 취약점에 대해 자동으로 패치 방법을 제안합니다. 보안을 위해 외부 서버를 공격 대상으로 지정할 수 없도록 제한하여 오용을 방지했습니다.",
				"에이전트의 메모리(기억)를 기록한 파일을 기반으로 조회용 API를 제공합니다. 해당 API를 통해 에이전트의 메타데이터, 행동 로그, 통계 데이터 등을 확인할 수 있으며, 이러한 데이터는 대시보드와 실시간 모니터링 및 재생(replay) 화면에서도 활용합니다.",
			],
		},
		{
			media: [
				{
					type: "video",
					src: forkComparison,
				},
				{
					src: api,
					alt: "simple api commands",
				},
			],
			descriptions: [
				"원본 프로젝트는 실시간 모니터링과 재생 기능만 제공하여 URL을 직접 입력해야 하는 등 다양한 불편함이 있었지만, 프로젝트 코드를 분석하고 리팩토링하여 컨트롤러와 대시보드 등 다양한 기능을 추가함으로써 완전한 시뮬레이션 환경을 구축했습니다.",
				"프로젝트 전용 도커 이미지를 제작하여 보다 안전하고 편리하게 사용할 수 있으며, 내장된 전용 명령어로 프론트엔드, 백엔드, API 등 주요 서비스를 손쉽게 실행할 수 있습니다. 또한 GitHub Actions를 활용해 도커 이미지 빌드 및 배포를 자동화했습니다.",
			],
		},
		{
			media: [
				{
					src: play,
					alt: "simulation preview",
				},
				{
					src: modal,
					alt: "simulation results modal",
				},
			],
		},
	],
};

export default item;
