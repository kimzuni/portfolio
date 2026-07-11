import * as markdown from "@/lib/markdown";

import type { Provider } from "@/components/skill-icon";

import * as category from "./category";
import * as level from "./level";



export const _items = [
	{
		pin: true,
		group: "language-and-runtime",
		category: "language",
		slug: "javascript",
		label: "JavaScript",
		level: 3.5,
		description: [
		],
	},
	{
		pin: true,
		group: "language-and-runtime",
		category: "language",
		slug: "typescript",
		label: "TypeScript",
		level: 3.5,
		description: [
		],
	},
	{
		pin: true,
		group: "language-and-runtime",
		category: "language",
		slug: "python",
		label: "Python",
		level: 3.5,
		description: [
		],
	},
	{
		group: "language-and-runtime",
		category: "language",
		slug: "go",
		label: "Go",
		level: 1.5,
		description: [
		],
	},
	{
		group: "language-and-runtime",
		category: "language",
		slug: "c",
		label: "C",
		level: 1.5,
		description: [
		],
	},
	{
		group: "language-and-runtime",
		category: "language",
		slug: "ruby",
		label: "Ruby",
		level: 1.5,
		description: [
		],
	},

	{
		pin: true,
		group: "language-and-runtime",
		category: "runtime",
		slug: "node-js",
		label: "Node.js",
		level: 2.5,
		description: [
		],
	},
	{
		pin: true,
		group: "language-and-runtime",
		category: "runtime",
		slug: "bun",
		label: "Bun",
		level: 3.5,
		description: [
		],
	},



	{
		pin: true,
		group: "backend",
		category: "framework",
		slug: "elysia",
		label: "Elysia",
		level: 3.5,
		description: [
		],
	},
	{
		pin: true,
		group: "backend",
		category: "framework",
		slug: "fastapi",
		label: "FastAPI",
		level: 3,
		description: [
		],
	},
	{
		pin: true,
		group: "backend",
		category: "framework",
		slug: "express-js",
		label: "Express.js",
		level: 3,
		description: [
		],
	},
	{
		pin: true,
		group: "backend",
		category: "framework",
		slug: "django",
		label: "Django",
		level: 3,
		description: [
		],
	},
	{
		group: "backend",
		category: "framework",
		slug: "gin",
		label: "Gin",
		level: 1.5,
		description: [
		],
	},



	{
		group: "frontend-and-ui",
		category: "markup",
		slug: "html",
		label: "HTML",
		level: 3.5,
		description: [
		],
	},

	{
		group: "frontend-and-ui",
		category: "style",
		slug: "css",
		label: "CSS",
		level: 3.5,
		description: [
		],
	},
	{
		pin: true,
		group: "frontend-and-ui",
		category: "style",
		slug: "tailwind-css",
		label: "Tailwind CSS",
		level: 3,
		description: [
		],
	},
	{
		group: "frontend-and-ui",
		category: "style",
		slug: "bootstrap",
		label: "Bootstrap",
		level: 2,
		description: [
		],
	},

	{
		pin: true,
		group: "frontend-and-ui",
		category: "framework",
		slug: "react",
		label: "React",
		level: 3,
		description: [
		],
	},
	{
		pin: true,
		group: "frontend-and-ui",
		category: "framework",
		slug: "next-js",
		label: "Next.js",
		level: 2.5,
		description: [
		],
	},
	{
		group: "frontend-and-ui",
		category: "framework",
		slug: "vue-js",
		label: "Vue.js",
		level: 1.5,
		description: [
		],
	},

	{
		pin: true,
		group: "frontend-and-ui",
		category: "library",
		slug: "shadcn-ui",
		label: "shadcn/ui",
		level: 2.5,
		description: [
		],
	},
	{
		group: "frontend-and-ui",
		category: "library",
		slug: "chart-js",
		label: "Chart.js",
		level: 0.5,
		description: [
		],
	},

	{
		group: "frontend-and-ui",
		category: "static-site-generator",
		slug: "vitepress",
		label: "VitePress",
		level: 1.5,
		description: [
		],
	},
	{
		group: "frontend-and-ui",
		category: "static-site-generator",
		slug: "jekyll",
		label: "Jekyll",
		level: 3,
		description: [
		],
	},



	{
		pin: true,
		group: "data-and-storage",
		category: "database",
		slug: "mariadb",
		label: "MariaDB",
		level: 3,
		description: [
		],
	},
	{
		group: "data-and-storage",
		category: "database",
		slug: "postgresql",
		label: "PostgreSQL",
		level: 0,
		description: [
		],
	},
	{
		group: "data-and-storage",
		category: "database",
		slug: "sqlite",
		label: "SQLite",
		level: 1.5,
		description: [
		],
	},

	{
		pin: true,
		group: "data-and-storage",
		category: "cache",
		slug: "redis",
		label: "Redis",
		level: 2.5,
		description: [
		],
	},

	{
		pin: true,
		icon: "drizzle",
		group: "data-and-storage",
		category: "orm",
		slug: "drizzle-orm",
		label: "Drizzle ORM",
		level: 2.5,
		description: [
		],
	},
	{
		group: "data-and-storage",
		category: "orm",
		slug: "sequelize",
		label: "Sequelize",
		level: 3,
		description: [
		],
	},
	{
		group: "data-and-storage",
		category: "orm",
		slug: "prisma",
		label: "Prisma",
		level: 1.5,
		description: [
		],
	},
	{
		icon: "django",
		group: "data-and-storage",
		category: "orm",
		slug: "django-orm",
		label: "Django ORM",
		level: 1,
		description: [
		],
	},
	{
		group: "data-and-storage",
		category: "orm",
		slug: "gorm",
		label: "GORM",
		level: 0.5,
		description: [
		],
	},



	{
		pin: true,
		group: "devops-and-infra",
		category: "os-shell",
		slug: "bash",
		label: "Bash",
		level: 3.5,
		description: [
		],
	},
	{
		pin: true,
		group: "devops-and-infra",
		category: "os-shell",
		slug: "linux",
		label: "Linux",
		level: 3.5,
		description: [
		],
	},

	{
		pin: true,
		group: "devops-and-infra",
		category: "cloud-container",
		slug: "docker",
		label: "Docker",
		level: 3.5,
		description: [
		],
	},
	{
		group: "devops-and-infra",
		category: "cloud-container",
		slug: "aws",
		label: "AWS",
		level: 1,
		description: [
		],
	},

	{
		pin: true,
		group: "devops-and-infra",
		category: "ci-cd",
		slug: "github-actions",
		label: "GitHub Actions",
		level: 3,
		description: [
		],
	},



	{
		pin: true,
		group: "tools",
		category: "collaboration",
		slug: "git",
		label: "Git",
		level: 3.5,
		description: [
		],
	},
	{
		group: "tools",
		category: "network",
		slug: "axios",
		label: "Axios",
		level: 2,
		description: [
		],
	},
	{
		group: "tools",
		category: "network",
		slug: "websocket",
		label: "WebSocket",
		level: 2.5,
		description: [
		],
	},
	{
		group: "tools",
		category: "build",
		slug: "vite",
		label: "Vite",
		level: 1.5,
		description: [
		],
	},
	{
		group: "tools",
		category: "package",
		slug: "npm",
		label: "npm",
		level: 2.5,
		description: [
		],
	},
	{
		group: "tools",
		category: "package",
		slug: "pnpm",
		label: "pnpm",
		level: 2,
		description: [
		],
	},

	{
		pin: true,
		group: "tools",
		category: "testing",
		slug: "vitest",
		label: "Vitest",
		level: 2,
		description: [
		],
	},
	{
		group: "tools",
		category: "testing",
		slug: "jest",
		label: "Jest",
		level: 1,
		description: [
		],
	},



	{
		group: "others",
		category: "ai",
		slug: "ollama",
		label: "Ollama",
		level: 1.5,
		description: [
		],
	},

	{
		icon: "https://cdn.phaser.io/images/logo/phaser-planet-small.png",
		group: "others",
		category: "game-dev",
		slug: "phaser",
		label: "Phaser",
		level: 1.5,
		description: [
		],
	},
	{
		icon: "https://www.mapeditor.org/img/tiled-logo-header.png",
		group: "others",
		category: "game-dev",
		slug: "tiled",
		label: "Tiled",
		level: 2,
		description: [
		],
	},
] as const satisfies ItemRaw[];



export const items: Item[] = await Promise.all(_items.map(async item => ({
	...item,
	group: category.group.get(item.group)!,
	category: category.get(item.group, item.category)!,
	level: level.get(item.level)!,
	description: await markdown.render(item.description),
})));

export type Slug<
	G extends category.group.Slug = category.group.Slug,
	C extends category.Slug<G> = category.Slug<G>,
> = (
	typeof _items[number] extends infer T
		? T extends { group: G; category: C; slug: string }
			? T["slug"]
			: never
		: never
);

export const slugs = _items.map(item => item.slug);

export const map = items.reduce((acc, item) => {
	acc[item.slug] = item;
	return acc;
}, {} as Record<string, Item>);

export const get = (slug: string) => {
	return map[slug];
}

export const has = (slug: string): slug is Slug => {
	return slug in map;
}



export type ItemRaw<G extends category.group.Slug = category.group.Slug> = G extends category.group.Slug
	? {
		pin?: boolean;
		level: level.Slug;
		group: G;
		category: category.Slug<G>;
		slug: string;
		label: string;

		icon?: string;
		provider?: Provider,
		description?: markdown.Source;
		warmup?: boolean;
		hidden?: boolean;
	}
	: never;

export type Item =
	& Omit<ItemRaw<category.group.Slug>, "level" | "group" | "category" | "description">
	& {
		level: level.Item;
		group: category.group.Item;
		category: category.Item;
		description: markdown.Result;
	};
