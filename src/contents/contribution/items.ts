import * as array from "@/lib/array";
import * as markdown from "@/lib/markdown";

import * as skill from "@/contents/skill";

import type {
	Item,
	ItemRaw,
	NumberObject,
} from "./types";

import * as git from "./git";
import * as label from "./label";
import * as type from "./type";



export const _items = [
	{
		pin: true,
		date: new Date("2024-04-24"),
		provider: "github",
		owner: "thijsvanloef",
		repository: "palworld-server-docker",
		status: "pr:merged",
		labels: ["refactor", "bug"],
		numbers: 540,
		skills: [
			"bash",
		],
		description: `
			- **cron 작업 감지 로직 개선**: Supercronic 실행 검증을 관련 환경변수 값을 확인하는 대신 파일 크기를 확인하도록 변경하여 유지보수성 향상
			- **로그 출력 버그 수정**: cron 작업 로그의 ANSI 색상 코드가 문자열로 출력되는 문제를 해결하여 로그 가독성 향상
		`,
	},



	{
		date: new Date("2025-06-29"),
		provider: "github",
		owner: "gaurishhs",
		repository: "elysia-ip",
		status: "pr:merged",
		labels: "bug",
		numbers: 38,
		skills: [
			"javascript",
			"elysia",
		],
		description: `
			- **IP 탐지 버그 수정**: 플러그인이 다른 플러그인 내부에서 사용될 때 IP를 탐지하지 못하는 버그를 수정하여 플러그인 호환성 향상
		`,
	},
	{
		pin: true,
		date: new Date("2025-07-31"),
		provider: "github",
		owner: "elysiajs",
		repository: "elysia",
		status: "pr:merged",
		labels: "bug",
		numbers: 1306,
		skills: [
			"typescript",
			"elysia",
		],
		description: `
			- **스키마 검증 함수 타입 추론 버그 수정**: 검증 성공 시 대상 객체의 타입이 정상 추론되도록 제네릭 타입 매핑 구조를 개선하여 타입 안전성 강화
		`,
	},
	{
		pin: true,
		date: new Date("2025-08-06"),
		provider: "github",
		owner: "elysiajs",
		repository: "elysia-jwt",
		status: "pr:merged",
		labels: "bug",
		numbers: [107, 108, 109],
		skills: [
			"bun",
			"typescript",
			"javascript",
			"elysia",
		],
		description: `
			- **Claim 타입 허용 범위 확장**: 스키마 미지정 시 다양한 Claim을 설정할 수 있도록 Claim 타입 허용 범위를 확장하여 유연성 향상
			- **Claim 옵션 \`iat\` 버그 수정**: \`iat\` Claim 비활성화 설정이 무시되거나 \`iat\` 값이 \`false\`로 설정되는 버그 수정
			- **Claim 옵션 기본 값 적용 로직 개선**: \`iat\`, \`exp\`, \`nbf\` 값이 \`undefined\`로 설정될 경우 기본 값이 적용되지 않도록 개선하여 다른 옵션과의 일관성 유지
			- **토큰 검증 함수 반환 타입 추론 버그 수정**: 디코딩된 Claim 타입이 유니온 및 교집합 등 잘못된 타입으로 추론되던 문제를 해결하여 타입 정확도 향상
		`,
	},
	{
		pin: true,
		date: new Date("2025-08-25"),
		provider: "github",
		owner: "elysiajs",
		repository: "elysia",
		status: "issue:closed",
		labels: "bug",
		numbers: 1360,
		skills: [
			"javascript",
			"elysia",
		],
		description: `
			- **라이프사이클 훅 미호출 버그 제보**: 라우터 핸들러 내에서 수동 예외 발생 시 \`onAfterResponse\` 훅이 호출되지 않는 버그를 발견하고, 이를 재현할 수 있는 최소한의 코드 예시 제공
		`,
	},



	{
		pin: true,
		date: new Date("2025-12-18"),
		provider: "github",
		owner: "adrienverge",
		repository: "yamllint",
		status: "pr:open",
		labels: "bug",
		numbers: [798],
		skills: [
			"python",
		],
		description: `
			- **\`new-line\` 규칙 에러 보고 로직 개선**: 중복 에러 보고를 방지하기 위해 첫 번째 라인만 검사하던 임시 로직을 파일 전체를 대상으로 첫 번째 에러만 보고하도록 개선
		`,
	},
] as const satisfies ItemRaw[];



const getType = (status: type.status.Slug) => status.split(":")[0] as type.Slug;

const getLabels = <T>(value: T | T[] | undefined): T[] | undefined => {
	const arr = array.to(value);
	return arr.length ? arr : undefined;
};

export const items: Item[] = await Promise.all(_items.sort((a, b) => b.date.getTime() - a.date.getTime()).map<Promise<Item>>(async (item: ItemRaw) => {
	const defaultType = getType(item.status)
	const defaultStatus = item.status;
	const defaultLabels = getLabels(item.labels) ?? [];

	const numbers: NumberObject[] = [];
	const arr = array.to(item.numbers);
	for (const _curr of arr) {
		const curr = typeof _curr === "number" ? { value: _curr } : _curr;
		const currStatus = curr.status ?? defaultStatus;
		const currType = getType(currStatus);
		const labels = getLabels(curr.labels) ?? defaultLabels;

		const values = array.to(curr.value);
		for (const value of values) {
			numbers.push({
				url: git.getNumberUrl(item.provider, item.owner, item.repository, currType, value),
				type: type.map.get(currType)!,
				status: type.status.map.get(currStatus)!,
				labels: labels.map(x => label.map.get(x)!),
				value,
			});
		}
	}

	return {
		pin: item.pin,
		provider: git.provider.map.get(item.provider)!,
		owner: git.owner.map.get(`${item.provider}:${item.owner}`)!,
		repository: git.repository.map.get(`${item.provider}:${item.owner}:${item.repository}`)!,
		date: item.date,
		numbers: numbers,
		skills: {
			all: (array.is(item.skills) ? item.skills : [...item.skills.primary, ...(item.skills.secondary ?? [])]).map(x => skill.map[x]!),
			primary: (array.is(item.skills) ? item.skills : item.skills.primary).map(x => skill.map[x]!),
			secondary: (array.is(item.skills) ? [] : (item.skills.secondary ?? [])).map(x => skill.map[x]!),
		},
		description: await markdown.render(item.description).then(x => x.raw === undefined ? x : {
			...x,

			// (text)#number 문자열을 PR/Issue 링크로 변환
			lines: x.lines?.map(line => line.replace(/(([a-zA-Z0-9_-]+\/)?[a-zA-Z0-9_-]+)?\#\d+/g, (text, userrepo: string | undefined) => {
				const split = userrepo?.split("/");
				const number = Number(text.split("#").pop()!);
				const owner = split?.pop() ?? item.owner;
				const repo = split?.pop() ?? item.repository;
				return `[${text}](${git.getNumberUrl(item.provider, owner, repo, "pr", number)})`;
			})),
		}),
		type: type.map.get(defaultType)!,
		status: type.status.map.get(defaultStatus)!,
		prNumbers: {
			all: numbers.filter(x => x.type.slug === "pr"),
			open: numbers.filter(x => x.type.slug === "pr" && x.status.slug === "pr:open"),
			merged: numbers.filter(x => x.type.slug === "pr" && x.status.slug === "pr:merged"),
			closed: numbers.filter(x => x.type.slug === "pr" && x.status.slug === "pr:closed"),
		},
		issueNumbers: {
			all: numbers.filter(x => x.type.slug === "issue"),
			open: numbers.filter(x => x.type.slug === "issue" && x.status.slug === "issue:open"),
			closed: numbers.filter(x => x.type.slug === "issue" && x.status.slug === "issue:closed"),
		},
	} satisfies Item;
}));

// 역참조 구성
for (const item of items) {
	item.provider.contributions.push(item);
	item.owner.contributions.push(item);
	item.repository.contributions.push(item);

	for (const number of item.numbers) {
		number.type.contributions.push(item);
		number.status.contributions.push(item);
		for (const label of number.labels) {
			label.contributions.push(item);
		}
	}

	for (const skill of item.skills.primary) {
		skill.contributions.all.push(item);
		skill.contributions.primary.push(item);
	}
	for (const skill of item.skills.secondary) {
		skill.contributions.all.push(item);
		skill.contributions.secondary.push(item);
	}
}
