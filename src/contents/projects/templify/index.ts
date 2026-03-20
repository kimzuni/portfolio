import type { ProjectContent } from "../";

import core from "./core.png";
import cli from "./cli.png";



export default {
	cover: core,
	title: "templify",
	description: "Node.js 환경에서 템플릿 문자열을 간단하게 처리할 수 있는 라이브러리와 CLI 툴을 제작하였습니다",
	period: [
		new Date("2025-10-21"),
	],
	tags: [
		"Package",
		"Deployment",
	],
	skills: [
		"Bun",
		"Node.js",
		"TypeScript",
		"Github Actions",
	],
	shields: [
		{
			service: "github",
			user: "kimzuni-labs",
			repo: "templify",
			badge: "last-commit",
		},
		{
			logo: "codecov",
			service: "coverage",
			badge: "codecov",
			vcs: "github",
			user: "kimzuni-labs",
			repo: "templify",
			link: true,
		},
	],
	badges: [
		{
			label: "GitHub",
			href: "https://github.com/kimzuni-labs/templify",
		},
		{
			label: "NPM",
			href: "https://www.npmjs.com/package/@kimzuni/templify",
		},
		{
			label: "NPM(CLI)",
			href: "https://www.npmjs.com/package/@kimzuni/templify-cli",
		},
	],
	sections: [
		{
			blocks: [
				{
					media: {
						type: "image",
						src: core,
						alt: "templify 코드 예시",
					},
					lines: [[
						"이 패키지는 파이썬의 percent-style 문자열 포맷팅에서 영감을 받아 시작되었습니다.",
						"외부 의존성 없이(Zero Dependency) 동작하며, open, close, key pattern 등 치환 규칙에 대한 다양한 커스터마이징이 가능합니다.",
					]],
				},
				{
					media: {
						type: "image",
						src: cli,
						alt: "templify-cli 명령어 예시",
					},
					lines: [[
						"코드 내부에서만 사용할 수 있었던 templify 기능을 CLI 영역까지 확장하고자 개발되었습니다.",
						"templify의 모든 기능을 사용할 수 있으며, 추가적으로 stdin 및 파일 입력 등 사용 편의를 위한 다양한 옵션을 함께 제공합니다.",
					]],
				},
			],
		},
	],
} satisfies ProjectContent;
