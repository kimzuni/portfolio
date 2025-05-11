import { SkillsItem } from "../pages/Home/Skills";



const items: SkillsItem[] = [
	{
		title: "Languages",
		cards: [
			{
				label: "HTML",
				level: "high",
			},
			{
				label: "CSS",
				level: "high",
			},
			{
				label: "JavaScript",
				icon: "js",
				level: "high",
			},
			{
				label: "Python",
				level: "high",
			},
			{
				label: "Bash",
				level: "high",
			},
			{
				label: "TypeScript",
				icon: "ts",
				level: "medium",
			},
		],
	},
	{
		title: "Framework/Library",
		cards: [
			{
				label: "Django",
				level: "high",
			},
			{
				label: "Express",
				level: "high",
			},
			{
				label: "Elysia",
				level: "medium",
			},
			{
				label: "Flask",
				level: "medium",
			},
			{
				label: "React",
				level: "medium",
			},
			{
				label: "Tailwindcss",
				level: "medium",
			},
			{
				label: "Bootstrap",
				level: "medium",
			},
		],
	},
	{
		title: "Tools/DevOps",
		cards: [
			{
				label: "Debian",
				level: "high",
			},
			{
				label: "Git",
				level: "medium",
			},
			{
				label: "Docker",
				level: "medium",
			},
			{
				label: "Node.js",
				icon: "nodejs",
				level: "medium",
			},
			{
				label: "Bun",
				level: "medium",
			},
		],
	},
];

export default items;
