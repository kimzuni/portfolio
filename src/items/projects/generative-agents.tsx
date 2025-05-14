import type { ProjectProps } from "../../pages/Project";



const item: ProjectProps = {
	pin: true,
	title: "Generative Agents",
	date: ["2024.09.02", "2024.12.04"],
	categories: ["Front-end", "Back-end", "Docker"],
	skills: [
		{ label: "django", color: "092E20" },
		{ label: "bootstrap", color: "7952b3" },
		{ label: "docker", color: "1D63ED" },
		{ label: "ollama", color: "black" },
		{ label: "chart.js", color: "FF6384" },
	],
	badges: {
		user: "JustPersona",
		repo: "generative-agents",
		style: "flat",
		items: [
			{
				repo: "generative-agents-docker",
				service: "github",
				badge: "workflow",
				workflow: "build.yml",
				provider: "shield",
				label: "build",
				logo: "docker",
			},
			{
				service: "github",
				badge: "license",
				logo: undefined,
			},
		],
	},
};

export default item;
