import type { ProjectContent } from "../";

import overview from "./overview.png";
import config from "./config.png";



export default {
	pin: true,
	cover: overview,
	title: "yamllint-js",
	description: "Python의 yamllint를 Node.js 환경에서 사용할 수 있도록 포팅하였습니다.",
	period: [
		new Date("2025-11-02"),
	],
	tags: [
		"Package",
		"Deployment",
	],
	skills: [
		"Node.js",
		"TypeScript",
		"Github Actions",
	],
	shields: [
		{
			service: "github",
			user: "kimzuni-labs",
			repo: "yamllint-js",
			badge: "last-commit",
		},
		{
			service: "npm",
			badge: "downloads",
			packageName: "yamllint-js",
			interval: "d18m",
		},
		{
			logo: "codecov",
			service: "coverage",
			badge: "codecov",
			vcs: "github",
			user: "kimzuni-labs",
			repo: "yamllint-js",
			link: true,
		},
	],
	badges: [
		{
			label: "Upstream",
			href: "https://github.com/adrienverge/yamllint",
		},
		{
			label: "GitHub",
			href: "https://github.com/kimzuni-labs/yamllint-js",
		},
		{
			label: "NPM",
			href: "https://www.npmjs.com/package/yamllint-js",
		},
	],
	sections: [
		{
			blocks: [
				{
					media: {
						type: "image",
						src: overview,
						alt: "린팅 결과 캡쳐",
					},
					lines: [[
						"Node.js 생태계에는 Python의 yamllint 수준에 필적하는 강력한 YAML 린터가 존재하지 않아 직접 구현하게 되었습니다.",
						"Python 의존성 없이 Node.js 환경만으로 yamllint와 동일한 린트 경험을 제공하는 것을 목표로 합니다.",
						"기존 yamllint와의 100% 호환성을 위해 모든 테스트 코드를 최대한 그대로 구현하였습니다.",
					]],
				},
				{
					media: {
						type: "image",
						src: config,
						alt: "yamllint.config.js 자동 완성",
					},
					lines: [[
						"기존 yamllint 설정 파일을 그대로 사용할 수 있을 뿐만 아니라, 추가적으로 Node.js 환경에 최적화된 설정 방식을 지원합니다.",
						"이를 통해 기존 yamllint 사용자는 물론, Node.js 기반 프로젝트 사용자 역시 쉽고 빠르게 YAML 린트 환경을 구성할 수 있도록 합니다.",
					]],
				},
			],
		},
	],
} satisfies ProjectContent;
