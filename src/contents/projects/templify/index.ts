import type { ProjectContent } from "../";

import method from "./methods.png";
import render from "./render.png";
import help from "./help.png";
import cli from "./cli.png";



export default {
	cover: method,
	title: "templify",
	description: [
		"Python의 `printf` 스타일 포맷팅에서 영감을 얻어, 외부 의존성 없이 구현한 92KB 규모의 경량 템플릿 파싱 및 렌더링 엔진을 개발했습니다.",
		"템플릿의 구조를 분석하여 메타데이터를 추출하는 파서(Parser) 기능을 내장하고 있습니다.",
		"파일 시스템에 의존하지 않는 순수 함수형 설계를 통해 브라우저부터 서버까지 어떤 환경에서도 유연하게 통합 가능하며,",
		"라이브러리 코어와 CLI 패키지를 분리하여 개발 생산성과 운영 범용성을 모두 확보했습니다.",
	],
	period: [
		new Date("2025-10-21"),
		new Date("2026-04-27"),
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
						src: method,
						alt: "templify 코드 예시 - methods",
					},
					text: [
						"단순 문자열 치환을 넘어, 템플릿의 구조를 해석하여 데이터 명세를 추출하는 지능형 분석 기능을 제공합니다.",
						"`keys`, `placeholders`/`fields`, `groups` 함수를 통해 템플릿에 필요한 필드를 사전에 파악하거나 복잡한 패턴 속 특정 그룹을 정교하게 분리할 수 있습니다.",
					],
				},
				{
					media: {
						type: "image",
						src: render,
						alt: "templify 코드 예시 - render",
					},
					text: [
						"사용자 워크플로우에 최적화된 유연한 렌더링 방식을 지원합니다.",
						"단순 일회성 치환을 위한 `render` 함수뿐만 아니라, 동일 템플릿을 여러 데이터로 반복 호출해야 하는 상황을 고려한 `compile` 패턴을 제공합니다.",
						"이를 통해 템플릿 처리 로직을 변수화하여 코드의 재사용성을 높이고, 비즈니스 로직과 템플릿 정의를 명확히 분리한 선언적인 코드를 작성할 수 있습니다.",
					],
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: help,
						alt: "templify-cli --help 출력 결과",
					},
					text: [
						"코어 엔진의 강력한 커스터마이징 옵션을 터미널 환경에서도 제약 없이 활용할 수 있는 전용 CLI 도구를 제공합니다.",
						"`templify` 및 별칭 `tply` 명령어를 통해 복잡한 템플릿 처리 로직을 쉘 스크립트나 자동화 파이프라인에 즉각 통합할 수 있으며,",
						"직관적인 도움말 시스템을 내장하여 모든 플래그와 사용법을 에디터 밖에서도 손쉽게 참조할 수 있습니다.",
					],
				},
				{
					media: {
						type: "image",
						src: cli,
						alt: "templify-cli 명령어 예시",
					},
					text: [
						"유닉스 철학을 계승하여 표준 입력(stdin)과 파이프라인(|)을 완벽하게 지원합니다.",
						"인라인 인자 전달부터 타 도구와의 출력을 연동하는 유기적인 워크플로우를 구성할 수 있으며,",
						"런타임 플래그를 통한 즉각적인 규칙 변경으로 복잡한 자동화 스크립트 내에서도 정교하고 예측 가능한 템플릿 처리를 보장합니다.",
					],
				},
			],
		},
	],
} satisfies ProjectContent;
