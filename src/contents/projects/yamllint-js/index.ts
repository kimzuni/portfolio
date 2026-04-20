import type { ProjectContent } from "../";

import overview from "./overview.png";
import coverage from "./coverage.png";
import config from "./config.png";

const vscode = "/videos/yamllint-js-vscode-preview.webm";



export default {
	pin: true,
	cover: overview,
	title: "yamllint-js",
	description: [
		"기존 `yamllint` 사용 시 필수적이었던 Python 런타임 종속성을 제거하고, 로컬 환경부터 CI/CD 파이프라인까지의 검증 도구를 Node.js 단일 스택으로 통합했습니다.",
		"이를 통해 파편화되어 있던 기존의 별도 환경 구축 및 Job/Step 설정을 `package.json` 스크립트 하나로 응집시켜 도구 체인의 관리 포인트를 최소화했습니다.",
		"원본과의 100% 호환을 목표로 모든 로직을 TypeScript로 포팅하여, 환경에 구애받지 않는 안정적이고 일관된 YAML 검증 환경을 제공합니다.",
	],
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
		{
			label: "VSCode Marketplace",
			href: "https://marketplace.visualstudio.com/items?itemName=kimzuni.vscode-yamllint-js",
		},
	],
	sections: [
		{
			blocks: [
				{
					media: {
						type: "image",
						src: overview,
						alt: "린트 결과 캡쳐",
					},
					text: [
						"이제 YAML 린트를 위해 Python을 설치하거나 CI/CD 설정을 별도로 구성할 필요가 없습니다.",
						"`package.json`에 스크립트 한 줄을 추가하는 것만으로, 로컬과 GitHub Actions 등 어디서든 즉시 동작하는 단일 린트 환경을 구성할 수 있습니다.",
					],
				},
				{
					media: {
						type: "image",
						src: config,
						alt: "yamllint-js.config.js 자동 완성",
					},
					text: [
						"단순 텍스트 설정을 넘어 정적 타입을 지원하는 구성 파일(`config.mjs` 등) 방식을 도입했습니다.",
						"IDE의 타입 추론과 자동 완성을 통해 별도의 문서를 조회하는 번거로움 없이, 누구나 정확하고 빠르게 린트 환경을 구성할 수 있습니다.",
					],
				},
			],
		},
		{
			blocks: [
				{
					colSpan: 3,
					media: {
						type: "image",
						src: coverage,
						alt: "커버리지 결과",
					},
					text: [
						"원본의 검증 로직을 TypeScript로 포팅하고, 98% 이상의 높은 테스트 커버리지를 통해 원본과의 기능적 정합성을 극대화했습니다.",
						"파이썬 의존성은 제거하면서도 라이브러리 본연의 신뢰도를 유지하여, 실제 운영 파이프라인에서 안심하고 사용할 수 있는 안정적인 검증 환경을 제공합니다.",
					],
				},
				{
					colSpan: 2,
					media: {
						type: "video",
						src: vscode,
					},
					text: [
						"공식 `yamllint` 확장의 부재로 인한 에디터 연동의 불편함을 해결하고자 전용 VS Code 확장을 직접 개발하여 배포했습니다.",
						"`yamllint-js`를 기반으로 타이핑과 동시에 실시간 피드백을 제공하며, 별도의 명령어나 도구 전환 없이 IDE 내에서 즉각적인 문법 교정이 가능한 최적의 개발 흐름을 구축했습니다.",
					],
				},
			],
		},
	],
} satisfies ProjectContent;
