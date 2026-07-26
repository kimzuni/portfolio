import type { ItemRaw } from "../types";

import benchmark from "./benchmark.png";
import overview from "./overview.png";
import playground from "./playground.png";

const cli = "cli.webm";



export const item: ItemRaw = {
	cover: overview,
	name: "Templify",
	description: `
		단순한 문자열 치환을 넘어, 룰을 커스텀하여 다양한 형태의 템플릿을 유연하게 다룰 수 있는 초경량 템플릿 엔진 및 CLI 툴입니다.
		개발 과정에서 에러 메시지 등 반복되는 문자열 포맷팅을 위해 매번 \`.replace\`나 별도의 함수를 작성해야 하는 번거로움을 해결하고자 개발했습니다.
	`,
	highlights: [
		{
			label: "~2KB Size",
			value: "Zero Dependency로 구현된 초경량 템플릿 엔진",
		},
		{
			label: "Lazy Evaluation & Cache",
			value: "클로저와 Map 캐싱을 활용한 지연 평가 및 중복 경로 탐색 비용 제거",
		},
		{
			label: "Cross-Environment",
			value: "Node.js, Deno, Bun, 브라우저 등 다양한 환경 지원",
		},
		{
			label: "CLI Integration",
			value: "표준 입력(stdin) 및 `.env`, `.json` 데이터 파일 로드 지원",
		},
		{
			label: "99%+ Coverage",
			value: "99% 이상의 높은 커버리지로 신뢰성 확보",
		},
	],
	period: [
		new Date("2025-10-21"),
		new Date("2026-08-30"),
	],
	tags: [
		"dev-tools",
		"open-source",
		"published",
		"frontend",
	],
	skills: {
		primary: [
			"typescript",
			"javascript",
			"node-js",
		],
		secondary: [
			"bun",
			"npm",
			"react",
			"tailwind-css",
			"shadcn-ui",
			"github-actions",
		],
	},
	shields: [
		{
			service: "npm",
			badge: "bundlejs",
			packageName: "@kimzuni/templify",
			link: "https://bundlephobia.com/package/@kimzuni/templify",
		},
		{
			service: "npm",
			badge: "unpacked-size",
			packageName: "@kimzuni/templify",
			link: true,
			linkSuffix: "?activeTab=code",
		},
		{
			service: "static",
			badge: "dependency_count-0-blue",
			link: "https://www.npmjs.com/package/@kimzuni/templify?activeTab=dependencies",
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
		{
			service: "github",
			user: "kimzuni-labs",
			repo: "templify",
			badge: "last-commit",
		},
	],
	links: [
		{
			label: "Playground",
			href: "https://labs.kimzuni.com/templify/",
		},
		{
			label: "GitHub",
			href: "https://github.com/kimzuni-labs/templify",
		},
		{
			label: "npm",
			href: "https://www.npmjs.com/package/@kimzuni/templify",
		},
		{
			label: "npm(CLI)",
			href: "https://www.npmjs.com/package/@kimzuni/templify-cli",
		},
	],
	articles: [
		{
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "image",
						src: benchmark,
						alt: "Templify 엔진 벤치마크",
						caption: "tinybench로 측정한 네이티브 템플릿 리터럴과 유명 템플릿 라이브러리들과의 성능 벤치마크 비교",
					},
					text: `
						엔진을 벤치마크한 결과, 초당 100만 회 이상의 연산 처리량과 1000ns 이하의 평균 지연 시간을 기록했습니다.
						이는 범용 템플릿 엔진인 \`handlebars.js\`와 비슷한 수준의 처리량을 보여주며,
						테스트에서 가장 빠른 \`mustache.js\`의 성능에도 근접한 결과입니다.

						이러한 성능을 확보하기 위해 다음과 같은 설계와 최적화를 적용했습니다.

						1. **지연 평가(Lazy Evaluation)**:
							\`compile\` 내 키 패턴과 메타데이터는 선언 즉시 계산되지 않고, 클로저와 Getter를 통해 실제 값이 필요한 시점에 동적으로 평가되도록 구현하여 불필요한 연산을 방지했습니다.
						2. **경로 파싱 및 캐싱**:
							중첩된 객체나 배열의 속성 탐색 시 \`Map\` 기반의 캐싱을 적용하여 반복 렌더링 시 발생하는 중복 문자열 연산을 최소화했습니다.
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
						src: overview,
						alt: "Templify 기본 예제 코드(.mjs) 및 실행 결과",
						caption: "사전 컴파일 방식과 즉시 렌더링 방식의 예제 코드 및 결과",
					},
					text: `
						템플릿 문자열을 분석 및 렌더링할 수 있는 \`compile\` 함수와,
						즉시 렌더링이 가능하고 트리 셰이킹에 친화적인 \`render\` 함수로 분리 설계하여
						직관적인 개발자 경험(DX)을 제공하고 프로젝트 빌드 시 번들 크기 최적화를 지원합니다.
						특히 \`compile\` 함수는 템플릿 문자열에서 메타데이터(\`keys\`, \`placeholders\`, \`groups\`)를 추출할 수 있어,
						렌더링 전 템플릿이나 컨텍스트 데이터를 검증하는 등 유연한 사전 처리가 가능하도록 합니다.

						또한 어떠한 형태의 템플릿 문자열에도 대응할 수 있도록,
						템플릿 구문 커스터마이징(구분자 및 공백 규칙),
						정규식을 활용한 키(key) 패턴,
						탐색 깊이 제한(depth),
						그리고 누락 데이터 기본값(fallback) 처리 등
						세분화된 설정 옵션을 지원합니다.
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
						src: cli,
						caption: "Templify CLI 실행 및 결과 예시",
					},
					text: `
						템플릿 엔진을 터미널 환경이나 자동화 배치 스크립트 등 쉘 환경에서 유연하게 통합할 수 있도록 CLI 툴을 제공하며,
						Node.js, Deno, Bun 등 다양한 런타임 환경에서 실행할 수 있습니다.
						템플릿 문자열은 인자, 파일, 표준 입력(stdin) 등 다양한 방식으로 전달할 수 있으며,
						옵션을 활용해 데이터 파일(\`.env\`, \`.json\`)을 로드하거나 환경 변수를 컨텍스트로 활용할 수 있습니다.
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
						src: playground,
						alt: "Templify Playground 페이지",
						caption: "다중 버전을 지원하는 CSR 기반의 Playground",
					},
					text: `
						템플릿 엔진을 테스트할 수 있는 [Playground](https://labs.kimzuni.com/templify/)를 제공합니다.
						템플릿 문자열과 컨텍스트 데이터를 입력하면 즉시 렌더링 결과와 메타데이터를 확인할 수 있으며,
						템플릿 규칙을 커스터마이징하여 다양한 형태의 템플릿 문자열을 테스트할 수 있습니다.
					`,
				},
			],
		},
	],
};
