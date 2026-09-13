import { getRepoUrl } from "./utils";

import * as provider from "./provider";
import * as owner from "./owner";
import type * as contribution from "../types";



export const _items = [
	{
		provider: "github",
		owner: "thijsvanloef",
		slug: "palworld-server-docker",
		scope: "도커 컨테이너 이미지",
	},
	{
		provider: "github",
		owner: "adrienverge",
		slug: "yamllint",
		scope: "린트 도구",
	},
	{
		provider: "github",
		owner: "elysiajs",
		slug: "elysia",
		scope: "백엔드 프레임워크",
	},
	{
		provider: "github",
		owner: "elysiajs",
		slug: "elysia-jwt",
		scope: "Elysia 플러그인",
	},
	{
		provider: "github",
		owner: "gaurishhs",
		slug: "elysia-ip",
		scope: "Elysia 플러그인",
	},
] as const satisfies ItemRaw[];



export const items = _items.map<Item>((x: ItemRaw) => ({
	...x,
	label: x.label || x.slug,
	url: getRepoUrl(x.provider, x.owner, x.slug),
	provider: provider.map.get(x.provider)!,
	owner: owner.map.get(`${x.provider}:${x.owner}`)!,
	contributions: [],
}));

// 역참조 구성
for (const item of items) {
	item.provider.repositories.push(item);
	item.owner.repositories.push(item);
}

export type Slug<
	P extends provider.Slug = provider.Slug,
	O extends owner.Slug<P> = owner.Slug<P>,
> = (
	typeof _items[number] extends infer T
		? T extends { provider: P; owner: O; slug: string }
			? T["slug"]
			: never
		: never
);
export const slugs = _items.map(item => item.slug);

/**
 * key: `${provider.slug}:${owner.slug}:${repository.slug}`
 */
export const map = new Map(items.map(item => [`${item.provider.slug}:${item.owner.slug}:${item.slug}`, item]));



export type ItemRaw<P extends provider.Slug = provider.Slug> = P extends provider.Slug
	? {
		provider: P;
		owner: owner.Slug<P>;
		slug: string;
		label?: string;
		scope: string;
	}
	: never;

export type Item =
	& Omit<ItemRaw<provider.Slug>, "provider" | "owner">
	& {
		url: string;
		provider: provider.Item;
		owner: owner.Item;
		label: string;
		contributions: contribution.Item[];
	};
