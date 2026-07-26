import type { ItemRaw } from "../types";

import overview from "./overview.png";
import coverage from "./coverage.png";
import config from "./config.png";

const vscode = "vscode-preview.webm";



export const item: ItemRaw = {
	pin: true,
	cover: overview,
	name: "yamllint-js",
	description: `
		Python 기반의 \`yamllint\`를 JavaScript 환경에서 사용할 수 있도록 포팅한 YAML 린트 도구입니다.
		Node.js 프로젝트에서 YAML 린팅을 위해 별도의 Python을 사용해야 하는 이질감과 번거로움을 해결하고자 개발했습니다.
	`,
	highlights: [
		{
			label: "Python-Free",
			value: "모든 로직 및 테스트 코드를 TypeScript로 재작성하여 Python 의존성 100% 제거",
		},
		{
			label: "Type-Safe Config",
			value: "스크립트 기반 설정 파일 지원 및 완벽한 타입 추론 제공",
		},
		{
			label: "98%+ Coverage",
			value: "98% 이상의 높은 커버리지로 신뢰성 확보",
		},
		{
			label: "Issue Fix",
			value: "`new-lines` 규칙에 대한 알려진 이슈([#475](https://github.com/adrienverge/yamllint/issues/475)) 해결",
		},
		{
			label: "VS Code Extension",
			value: "전용 VS Code 확장을 통해 실시간 린트 결과 및 피드백 제공",
		},
	],
	period: [
		new Date("2025-11-02"),
		new Date("2026-02-22"),
	],
	tags: [
		"dev-tools",
		"open-source",
		"published",
	],
	skills: {
		primary: [
			"typescript",
			"javascript",
			"node-js",
		],
		secondary: [
			"npm",
			"vitest",
			"vscode-extension",
			"github-actions",
		],
	},
	shields: [
		{
			service: "npm",
			badge: "downloads",
			packageName: "yamllint-js",
			interval: "dy",
			link: true,
		},
		{
			service: "npm",
			badge: "downloads",
			packageName: "yamllint-js",
			interval: "dw",
			link: true,
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
		{
			service: "github",
			user: "kimzuni-labs",
			repo: "yamllint-js",
			badge: "last-commit",
		},
	],
	links: [
		{
			label: "GitHub",
			href: "https://github.com/kimzuni-labs/yamllint-js",
		},
		{
			label: "npm",
			href: "https://www.npmjs.com/package/yamllint-js",
		},
		{
			label: "VS Code Marketplace",
			href: "https://marketplace.visualstudio.com/items?itemName=kimzuni.vscode-yamllint-js",
		},
		{
			label: "Upstream",
			href: "https://github.com/adrienverge/yamllint",
		},
	],
	articles: [
		{
			blocks: [
				{
					colSpan: 2,
					media: {
						type: "image",
						src: overview,
						alt: "Python 버전 확인 결과 및 린트 실행 결과",
						caption: "node:24-alpine 기반 컨테이너 환경에서의 린트 실행 결과",
					},
				},
				{
					colSpan: 3,
					media: {
						type: "image",
						src: coverage,
						alt: "테스트 커버리지 결과",
						caption: "Vitest 기반 테스트 커버리지 결과",
					},
				},
			],
		},
		{
			linkedToPrevious: true,
			blocks: [
				{
					text: `
						Python이 설치되지 않은 환경에서도 안정적으로 린트를 수행할 수 있도록 모든 로직과 테스트 코드를 TypeScript로 재작성하여 Python 의존성을 제거했습니다.
						특히 PyPI의 \`PyYAML\`과 npm의 \`yaml\` 간의 파서 토큰 구조 차이를 다음과 같은 로직을 적용하여 해결함으로써 98% 이상의 높은 테스트 커버리지를 확보했습니다.

						1. **불일치 토큰 필터링**: \`PyYAML\`에 존재하지 않는 \`space\`, \`comment\`, \`newline\` 토큰을 제너레이터 단계에서 무시하도록 처리하여 \`PyYAML\`과 동일한 토큰을 생성하도록 구성했습니다.
						2. **누락 토큰 대체 및 상태 판별**: 반대로 \`yaml\`에 존재하지 않는 \`BlockEnd\` 토큰을 대신 처리하기 위해 \`Token\` 클래스 내부에 \`isBlockEnd\` Getter를 구현하여 \`PyYAML\`과 동일한 흐름으로 동작하도록 보완했습니다.
					`,
				},
			],
		},
		{
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "image",
						src: config,
						alt: "yamllint-js.config.js 자동 완성",
						caption: "VS Code에서 UserConfig 타입을 활용한 타입 추론 및 자동 완성",
					},
					text: `
						\`yamllint\`에서 사용 가능한 \`.yamllint.yml\` 등의 정적 설정 파일 외에도,
						Node.js 생태계에 친숙한 \`yamllint-js.config.js\`와 같은 스크립트 기반 설정 파일을 지원합니다.
						이를 통해 코드 에디터에서의 강력한 타입 추론과 자동완성을 제공함으로써,
						별도의 문서 조회 없이도 정확하고 신속하게 린트 환경을 구성할 수 있는 개발자 경험(DX)를 제공합니다.
					`,
				},
			],
		},
		{
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "video",
						src: vscode,
						caption: "VS Code 확장을 통해 실시간 린트 결과 및 피드백을 확인하는 장면",
					},
					text: `
						\`yamllint\`의 공식 VS Code 확장의 부재를 해결하기 위해 전용 VS Code 확장을 개발했습니다.
						이를 통해 별도의 명령어나 도구를 사용하지 않고도 VS Code 내에서 실시간으로 린트 결과를 확인하고 즉각적인 피드백을 받을 수 있습니다.
					`,
				},
			],
		},
		{
			blocks: [
				{
					text: `
						### Next Steps

						1. 모노레포 아키텍처 전환 및 패키지 분리
							- 웹 브라우저 환경에서도 제약 없이 동작하도록 핵심 로직을 모듈화하여 분리
							- VS Code 확장 패키지의 번들 사이즈 최적화 및 실시간 피드백 성능 개선
							- 사용자 정의 커스텀 룰 및 플러그인 확장 아키텍처 지원
						2. 에디터 생태계 확장
							- Cursor, Antigravity 등 다양한 개발 에디터 환경으로 지원 범위 확대
					`,
				},
			],
		},
	],
};
