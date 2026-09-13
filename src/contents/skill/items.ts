import * as markdown from "@/lib/markdown";

import type { Provider } from "@/components/skill-icon";

import type * as contribution from "@/contents/contribution";
import type * as project from "@/contents/project";
import * as category from "./category";
import * as level from "./level";



export const _items = [
	{
		pin: true,
		category: "programming",
		slug: "javascript",
		label: "JavaScript",
		level: 3.5,
		description: ``,
	},
	{
		pin: true,
		category: "programming",
		slug: "typescript",
		label: "TypeScript",
		level: 3.5,
		description: ``,
	},
	{
		pin: true,
		category: "programming",
		slug: "python",
		label: "Python",
		level: 3.5,
		description: ``,
	},
	{
		category: "programming",
		slug: "c",
		label: "C",
		level: 2,
		description: ``,
	},
	{
		category: "programming",
		slug: "go",
		label: "Go",
		level: 1.5,
		description: ``,
	},
	{
		category: "programming",
		slug: "ruby",
		label: "Ruby",
		level: 1.5,
		description: ``,
	},

	{
		category: "markup-style",
		slug: "html",
		label: "HTML",
		level: 3.5,
		description: ``,
	},
	{
		category: "markup-style",
		slug: "css",
		label: "CSS",
		level: 3.5,
		description: ``,
	},

	{
		pin: true,
		category: "shell",
		slug: "bash",
		label: "Bash",
		level: 3.5,
		description: ``,
	},



	{
		pin: true,
		category: "frontend-frameworks",
		slug: "react",
		label: "React",
		level: 3,
		description: ``,
	},
	{
		pin: true,
		category: "frontend-frameworks",
		slug: "next-js",
		label: "Next.js",
		level: 2.5,
		description: ``,
	},
	{
		category: "frontend-frameworks",
		slug: "vue-js",
		label: "Vue.js",
		level: 1.5,
		description: ``,
	},

	{
		pin: true,
		category: "styling-ui",
		slug: "tailwind-css",
		label: "Tailwind CSS",
		level: 3,
		description: ``,
	},
	{
		category: "styling-ui",
		slug: "bootstrap",
		label: "Bootstrap",
		level: 2,
		description: ``,
	},
	{
		pin: true,
		category: "styling-ui",
		slug: "shadcn-ui",
		label: "shadcn/ui",
		level: 2.5,
		description: ``,
	},

	{
		category: "frontend-libraries",
		slug: "chart-js",
		label: "Chart.js",
		level: 0.5,
		description: ``,
	},

	{
		category: "static-sites",
		slug: "jekyll",
		label: "Jekyll",
		level: 3,
		description: ``,
	},
	{
		category: "static-sites",
		slug: "vitepress",
		label: "VitePress",
		level: 1.5,
		description: ``,
	},



	{
		pin: true,
		category: "runtimes",
		slug: "node-js",
		label: "Node.js",
		level: 3,
		description: ``,
	},
	{
		pin: true,
		category: "runtimes",
		slug: "bun",
		label: "Bun",
		level: 3,
		description: ``,
	},

	{
		pin: true,
		category: "backend-frameworks",
		slug: "elysia",
		label: "Elysia",
		level: 3,
		description: ``,
	},
	{
		pin: true,
		category: "backend-frameworks",
		slug: "fastapi",
		label: "FastAPI",
		level: 3,
		description: ``,
	},
	{
		pin: true,
		category: "backend-frameworks",
		slug: "express-js",
		label: "Express.js",
		level: 3,
		description: ``,
	},
	{
		pin: true,
		category: "backend-frameworks",
		slug: "django",
		label: "Django",
		level: 3,
		description: ``,
	},
	{
		category: "backend-frameworks",
		slug: "gin",
		label: "Gin",
		level: 1.5,
		description: ``,
	},



	{
		pin: true,
		category: "databases",
		slug: "mariadb",
		label: "MariaDB",
		level: 2.5,
		description: ``,
	},
	{
		category: "databases",
		slug: "postgresql",
		label: "PostgreSQL",
		level: 0,
		description: ``,
	},
	{
		category: "databases",
		slug: "sqlite",
		label: "SQLite",
		level: 1.5,
		description: ``,
	},

	{
		pin: true,
		category: "cache",
		slug: "redis",
		label: "Redis",
		level: 2.5,
		description: ``,
	},

	{
		pin: true,
		icon: "drizzle",
		category: "orms",
		slug: "drizzle-orm",
		label: "Drizzle ORM",
		level: 3,
		description: ``,
	},
	{
		category: "orms",
		slug: "sequelize",
		label: "Sequelize",
		level: 3,
		description: ``,
	},
	{
		category: "orms",
		slug: "sqlalchemy",
		label: "SQLAlchemy",
		level: 2,
		description: ``,
	},
	{
		category: "orms",
		slug: "prisma",
		label: "Prisma",
		level: 1.5,
		description: ``,
	},
	{
		icon: "django",
		category: "orms",
		slug: "django-orm",
		label: "Django ORM",
		level: 1,
		description: ``,
	},
	{
		category: "orms",
		slug: "gorm",
		label: "GORM",
		level: 0.5,
		description: ``,
	},



	{
		pin: true,
		category: "System-containers",
		slug: "linux",
		label: "Linux",
		level: 3.5,
		description: ``,
	},

	{
		pin: true,
		category: "System-containers",
		slug: "docker",
		label: "Docker",
		level: 3.5,
		description: ``,
	},

	{
		category: "Cloud-hosting",
		slug: "aws",
		label: "AWS",
		level: 1,
		description: ``,
	},
	{
		category: "Cloud-hosting",
		slug: "vercel",
		label: "Vercel",
		level: 1,
		description: ``,
	},

	{
		pin: true,
		category: "ci-cd",
		slug: "github-actions",
		label: "GitHub Actions",
		level: 3,
		description: ``,
	},



	{
		pin: true,
		category: "version-control",
		slug: "git",
		label: "Git",
		level: 3.5,
		description: ``,
	},

	{
		category: "package-managers",
		slug: "npm",
		label: "npm",
		level: 2.5,
		description: ``,
	},
	{
		category: "package-managers",
		slug: "pnpm",
		label: "pnpm",
		level: 2,
		description: ``,
	},

	{
		category: "build",
		slug: "vite",
		label: "Vite",
		level: 1.5,
		description: ``,
	},

	{
		pin: true,
		category: "testing",
		slug: "vitest",
		label: "Vitest",
		level: 2,
		description: ``,
	},
	{
		category: "testing",
		slug: "jest",
		label: "Jest",
		level: 1,
		description: ``,
	},

	{
		category: "network-api",
		slug: "axios",
		label: "Axios",
		level: 2,
		description: ``,
	},
	{
		category: "network-api",
		slug: "websocket",
		label: "WebSocket",
		level: 2.5,
		description: ``,
	},



	{
		icon: "vscode",
		category: "extensions",
		slug: "vscode-extension",
		label: "VS Code Extension",
		level: 1.5,
		description: ``,
	},

	{
		category: "ai",
		slug: "ollama",
		label: "Ollama",
		level: 1.5,
		description: ``,
	},

	{
		icon: "https://cdn.phaser.io/images/logo/phaser-planet-small.png",
		category: "game-dev",
		slug: "phaser",
		label: "Phaser",
		level: 1.5,
		description: ``,
	},
	{
		icon: "https://www.mapeditor.org/img/tiled-logo-header.png",
		category: "game-dev",
		slug: "tiled",
		label: "Tiled",
		level: 2,
		description: ``,
	},
] as const satisfies ItemRaw[];



export const items: Item[] = await Promise.all(
	_items
		.map<Promise<Item>>(async (item) => ({
			...item,
			group: category.map.get(item.category)!.group,
			category: category.map.get(item.category)!,
			level: level.map.get(item.level)!,
			description: await markdown.render(item.description),
			projects: {
				all: [],
				primary: [],
				secondary: [],
			},
			contributions: {
				all: [],
				primary: [],
				secondary: [],
			},
		}))
);

// 역참조 구성
for (const item of items) {
	item.group.skills.push(item);
	item.category.skills.push(item);
	item.level.skills.push(item);
}

export type Slug<
	C extends category.Slug = category.Slug,
> = (
	typeof _items[number] extends infer T
		? T extends { category: C; slug: string }
			? T["slug"]
			: never
		: never
);

export const slugs = _items.map(item => item.slug);

export const map = items.reduce<Record<string, Item>>((acc, item) => {
	acc[item.slug] = item;
	return acc;
}, {});

export const get = (slug: string) => {
	return map[slug];
}

export const has = (slug: string): slug is Slug => {
	return slug in map;
}



export interface ItemRaw {
	pin?: boolean;
	level: level.Slug;
	category: category.Slug;
	slug: string;
	label: string;

	icon?: string;
	provider?: Provider,
	description?: markdown.Source;
	warmup?: boolean;
	hidden?: boolean;
}

export interface Item extends Omit<ItemRaw, "level" | "group" | "category" | "description"> {
	level: level.Item;
	group: category.group.Item;
	category: category.Item;
	slug: Slug;
	description: markdown.Result;
	projects: Record<"all" | "primary" | "secondary", project.Item[]>;
	contributions: Record<"all" | "primary" | "secondary", contribution.Item[]>;
}
