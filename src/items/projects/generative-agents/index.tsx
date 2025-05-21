import type { Item } from "../";

import n25 from "./n25.png";
import dashboard from "./dashboard.png";
import play from "./play.gif";
import modal from "./modal.png";
import api from "./docker-api.gif";



const item: Item = {
	pin: true,
	title: "Generative Agents (졸업작품)",
	date: [new Date("2024-09-02"), new Date("2024-12-04")],
	categories: ["Frontend", "Backend", "Docker"],
	contribution: [
		{ label: "Frontend", percentage: 100 },
		{ label: "Backend", percentage: 100 },
		{ label: "Infra", percentage: 100 },
		{ label: "AI", percentage: 0 },
	],
	skills: [
		{ label: "Django", color: "092E20" },
		{ label: "Bootstrap", color: "7952b3" },
		{ label: "Docker", color: "1D63ED" },
		{ label: "Ollama", color: "black" },
		{ label: "Chart.js", color: "FF6384" },
		{ label: "Phaser", color: "b6e5f8", },
	],
	badges: {
		user: "JustPersona",
		repo: "generative-agents",
		items: [
			{
				service: "badge",
				badge: "source-forked_from-5cc9ff",
				logo: "github",
				link: "https://github.com/joonspk-research/generative_agents",
			},
			{
				service: "github",
				badge: "license",
				logo: undefined,
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
			images: [
				{
					src: n25,
					alt: "Hacker Ville",
				},
				{
					src: dashboard,
					alt: "main dashboard",
				},
			],
			descriptions: [
				"2인 팀으로 진행한 졸업작품입니다. LLM을 활용하여 미리 지정된 웹 서버에 대한 해킹 공격과 방어 시나리오를 자동으로 생성 및 수행하고, 발견된 취약점에 대해 패치 방법을 제안합니다.",
				"모든 과정과 생성된 데이터는 별도의 파일에 저장되어 실시간 모니터링, 리플레이, API를 통한 데이터 조회가 가능하며, 제로데이 취약점 탐지 가능성도 제공합니다.",
				"전용 도커 이미지를 통해 보다 안전하고 편리하게 사용할 수 있으며, 단일 명령어로 프론트엔드, 백엔드, API 등 다양한 작업을 쉽게 실행할 수 있습니다.",
			],
		},
		{
			images: [
				{
					src: play,
					alt: "simulation preview",
				},
				{
					src: modal,
					alt: "simulation results modal",
				},
				{
					src: api,
					alt: "simple api commands",
				},
			],
		},
	],
};

export default item;
