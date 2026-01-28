import { compareFn } from "@/lib/utils";
import type { SkillGroupData } from "@/app/_components/page/skills";



type SkillsType<K extends string = string> = Record<K, SkillGroupData>;

const data = {
	Language: {
		icon: "Code2",
		items: [
			{
				label: "JavaScript",
			},
			{
				label: "TypeScript",
			},
			{
				label: "Python",
			},
		],
	},
	"Runtime & Platform": {
		icon: "Code2",
		items: [
			{
				label: "Bun",
			},
			{
				label: "Node.js",
			},
			{
				label: "Linux",
			},
		],
	},
	Frontend: {
		icon: "Layout",
		items: [
			{
				label: "HTML",
				hidden: true,
			},
			{
				label: "CSS",
				hidden: true,
			},
			{
				label: "React",
			},
			{
				label: "Vue.js",
				hidden: true,
			},
			{
				icon: "tailwind",
				label: "Tailwind CSS",
			},
			{
				label: "shadcn/ui",
			},
			{
				label: "Bootstrap",
			},
			{
				label: "Vite",
				hidden: true,
			},
			{
				label: "Next.js",
				hidden: true,
			},
		],
	},
	Backend: {
		icon: "Server",
		items: [
			{
				label: "Express",
			},
			{
				label: "Elysia",
			},
			{
				label: "Django",
			},
			{
				label: "Flask",
				hidden: true,
			},
			{
				label: "WebSocket",
				hidden: true,
			},
		],
	},
	"Database & ORM": {
		icon: "Database",
		items: [
			{
				label: "MariaDB",
				hidden: true,
			},
			{
				label: "SQLite",
				hidden: true,
			},
			{
				label: "Redis",
				hidden: true,
			},
			{
				label: "Prisma",
			},
			{
				icon: "drizzle",
				label: "Drizzle ORM",
			},
			{
				label: "Sequelize",
			},
			{
				icon: "django",
				label: "Django ORM",
			},
			{
				label: "SQLAlchemy",
				hidden: true,
			},
		],
	},
	"DevOps & Infrastructure": {
		icon: "Cloud",
		items: [
			{
				label: "Docker",
			},
			{
				label: "Github Actions",
			},
		],
	},
	"Tools & Others": {
		icon: "Wrench",
		items: [
			{
				label: "Git",
			},
			{
				label: "Bash",
			},
			{
				label: "Axios",
				hidden: true,
			},
			{
				label: "Ollama",
				hidden: true,
			},
			{
				label: "Phaser",
				hidden: true,
			},
			{
				label: "Tiled",
				hidden: true,
			},
		],
	},
} as const satisfies SkillsType;

export type SkillCategory = keyof typeof data;
export type Skill = typeof data[SkillCategory]["items"][number]["label"];

Object.values(data).map(x => x.items.sort((a, b) => compareFn(a.label, b.label)));

export type SkillsContent = SkillsType<SkillCategory>;
export const skills: SkillsContent = data;
