import * as app from "@/contents/app";

import type { ItemRaw } from "../types";

import heroLightSrc from "./hero-light.png";
import heroDarkSrc from "./hero-dark.png";
import mailFormLightSrc from "./mail-form-light.png";
import mailFormDarkSrc from "./mail-form-dark.png";
import lighthouse from "./lighthouse.png";
import performance from "./performance.png";



export const item: ItemRaw = {
	pin: true,
	cover: {
		lightSrc: heroLightSrc,
		darkSrc: heroDarkSrc,
	},
	name: "웹 포트폴리오",
	description: `
		개발자로서의 성장 과정과 스킬, 프로젝트, 오픈소스 기여 활동을 기록하기 위해 개발한 개인 웹 포트폴리오입니다.
		Next.js의 SSR 환경과 shadcn/ui 컴포넌트 라이브러리를 활용해 일관된 UI를 구축했으며,
		전용 이메일 전송 API 기반의 이메일 전송 기능과 마크다운 렌더링을 구현했습니다.
	`,
	highlights: [
		{
			label: "Performance & Quality",
			value: "모든 페이지 Lighthouse 전 항목 **90~100점** 달성, 불필요한 **렌더링 최적화**",
		},
		{
            label: "Email Integration",
            value: "실시간 **Health Check** 및 **백그라운드 폴링 자동 중단**이 적용된 이메일 전송 폼 구현",
		},
		{
            label: "Responsive Design",
			value: "모바일 및 데스크탑 환경에 최적화된 **반응형 UI** 구현",
		},
	],
	period: [
		new Date("2025-05-08"),
		app.item.releaseDate,
	],
	tags: [
		"ssr",
		"frontend",
		"deployed",
	],
	skills: {
		primary: [
			"typescript",
			"javascript",
			"react",
			"tailwind-css",
			"shadcn-ui",
			"next-js",
		],
		secondary: [
			"vercel",
			"github-actions",
		],
	},
	links: [
		{
			label: "GitHub",
			href: "https://github.com/kimzuni/portfolio",
		},
	],
	articles: [
		{
			maxWidth: 850,
			blocks: [
				{
					media: {
						type: "image",
						src: lighthouse,
						alt: "Lighthouse 측정 결과",
						caption: "Google Lighthouse로 측정한 종합 웹 성능 지표",
					},
					text: `
						Lighthouse 기반의 웹 표준 및 성능 측정 결과, **전체 페이지 전 항목 90점 이상**의 높은 점수를 달성했습니다.
						Next.js 16 App Router 기반의 서버 사이드 렌더링(SSR)과 이미지 자동 최적화,
						React 19에서의 React Compiler 기반 자동 메모이제이션을 통해
						불필요한 렌더링을 최소화하고 쾌적한 로딩 속도와 부드러운 인터랙션 경험을 제공합니다.
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
						src: performance,
						alt: "Chrome DevTools Performance 탭의 타임라인 및 메모리 프로파일링 측정 그래프 화면",
						caption: "Vercel Preview 배포 환경 초기 로딩 프로파일링 (0~5.3초 구간)",
					},
					text: `
						페이지 진입 직후 약 1.45초 구간까지 컴포넌트 마운트 및 초기 스크립트 실행으로 인해 일시적인 메인 스레드 점유(55.59ms)와 일부 프레임 드롭이 발생하지만,
						LCP 도달 이후에는 메인 스레드가 유휴 상태로 전환되며 프레임 드롭 없이 안정적인 초록색 프레임을 유지합니다.
						또한 실행 과정 전반에 걸쳐 JS Heap 메모리가 11MB~22MB 대의 일정한 수준을 유지하여 메모리 누수 없이 리소스가 안정적으로 관리되고 있음을 확인했습니다.
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
						lightSrc: mailFormLightSrc,
						darkSrc: mailFormDarkSrc,
						alt: "메인 페이지 Contact 섹션 및 입력 폼(Form)",
						caption: "실시간 Health Check 결과가 반영된 이메일 전송을 위한 입력 폼(Form)",
					},
					text: `
						별도로 개발한 REST API 서버의 이메일 전송 기능을 연동하여 메인 화면에서 직접 이메일을 보낼 수 있는 폼(Form)을 구현했습니다.
						사용자가 전송 가능 여부를 직관적으로 인지할 수 있도록 API 서버 상태를 실시간으로 확인하여 UI에 표시하고,
						불필요한 리소스 낭비를 방지하기 위해 입력 폼이 뷰포트를 벗어나거나 브라우저 탭이 비활성화되는 경우 상태 체크를 자동으로 중단하도록 처리했습니다.
					`,
				},
			],
		},
	],
};
