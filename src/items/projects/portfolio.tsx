import type { Item } from "./";

import intro from "./imgs/portfolio-intro.png";



const item: Item = {
	title: "Web Portfolio",
	skills: [
		{ label: "React", color: "61DBFB" },
		{ label: "Tailwindcss", color: "00bcff" },
		{ label: "TypeScript", color: "358EF1" },
	],
	badges: {
		user: "kimzuni",
		repo: "portfolio",
		items: [
			{
				service: "github",
				badge: "lastCommit",
				link: true,
			},
		],
	},
	sections: [
		{
			images: [
				{
					src: intro,
					alt: "home intro",
				},
			],
			description: [
				"My Web Portfolio",
			],
		},
	],
};

export default item;
