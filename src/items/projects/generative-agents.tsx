import type { Item } from "./";

import n25 from "./imgs/generative-agents-n25.png";
import dashboard from "./imgs/generative-agents-dashboard.png";



const item: Item = {
	title: "Generative Agents",
	date: ["2024.09.02", "2024.12.04"],
	categories: ["Front-end", "Back-end", "Docker"],
	contribution: [
		{ label: "Front-end", percentage: 100 },
		{ label: "Back-end", percentage: 100 },
		{ label: "Server", percentage: 100 },
		{ label: "AI", percentage: 0 },
	],
	skills: [
		{ label: "Django", color: "092E20" },
		{ label: "Bootstrap", color: "7952b3" },
		{ label: "Docker", color: "1D63ED" },
		{ label: "Ollama", color: "black" },
		{ label: "Chart.js", color: "FF6384" },
		{ label: "Phaser" },
	],
	badges: {
		user: "JustPersona",
		repo: "generative-agents",
		style: "flat",
		items: [
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
				},
				{
					src: dashboard,
					alt: "dashboard",
				},
			],
			description: <>
				<p>description 1</p>
			</>,
		},
		{
			images: [
				{
					src: n25,
					alt: "thumbnail",
				},
				{
					src: dashboard,
				},
			],
			description: <>
				<p>description 2</p>
			</>,
		},
	],
};

export default item;
