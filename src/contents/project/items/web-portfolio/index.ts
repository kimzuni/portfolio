import * as app from "@/contents/app";

import type { ItemRaw } from "../types";

import heroLightSrc from "./hero-light.png";
import heroDarkSrc from "./hero-dark.png";
import mailFormLightSrc from "./mail-form-light.png";
import mailFormDarkSrc from "./mail-form-dark.png";
import lighthouse from "./lighthouse.png";
import performance from "./performance.png";
import vercelDeployments from "./vercel-deployments.png";
import deployURLActionsSummary from "./deploy-url-in-actions-summary.png";
import deployURLInPrComment from "./deploy-url-in-pr-comment.png";



export const item: ItemRaw = {
	pin: true,
	cover: {
		lightSrc: heroLightSrc,
		darkSrc: heroDarkSrc,
	},
	name: "웹 포트폴리오",
	description: `
		개발자로서의 성장 과정과 스킬, 프로젝트, 오픈소스 기여 활동을 기록하기 위해 개발한 개인 웹 포트폴리오입니다.
		Next.js 기반의 SSR 환경에서 shadcn/ui 컴포넌트 라이브러리와 Tailwind CSS를 사용하여 UI/UX를 구현했으며,
		별도로 개발한 이메일 전송 API를 활용해 실제 전송이 가능한 익명 이메일 전송 서비스를 제공합니다.
	`,
	highlights: [
		{
			label: "Performance & Quality",
			value: "모든 페이지 Lighthouse 전 항목 **90~100점**, 불필요한 **렌더링 최적화**",
		},
		{
			label: "Runtime Performance",
			value: "**LCP 1.57s** 달성, 메인 스레드 **병목 최소화** (152ms)",
		},
		{
			label: "Responsive Design",
			value: "모바일 및 데스크탑 환경에 최적화된 **반응형 UI**",
		},
		{
			label: "CI/CD Automation",
			value: "GitHub Actions 기반 **배포 자동화** 및 Preview 배포 URL **코멘트 자동화**",
		},
	],
	period: [
		new Date("2025-05-08"),
		app.item.releaseDate,
	],
	tags: [
		"ssr",
		"frontend",
		"ci-cd",
	],
	skills: {
		primary: [
			"typescript",
			"next-js",
			"react",
		],
		secondary: [
			"javascript",
			"shadcn-ui",
			"tailwind-css",
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
			tab: "Performance",
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
			tab: "Performance",
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "image",
						src: performance,
						alt: "Chrome DevTools Performance 탭의 타임라인 및 메모리 프로파일링 측정 그래프 화면",
						caption: "Vercel 배포 환경 초기 로딩 프로파일링 (0 ~ 약 2초 구간)",
					},
					text: `
						약 3.4MB 규모의 리소스를 로드하는 환경에서 LCP 1.57초를 기록하여 초기 뷰 렌더링을 빠르게 완료했습니다.
						특히 컴포넌트 마운트 및 스크립트 평가에 소요되는 Scripting 시간을 152ms, Rendering 시간을 139ms 수준으로 통제하여 메인 스레드 병목을 최소화하고, 지연 없이 유휴(Idle) 상태로 전환되도록 최적화했습니다.
						또한 초기 로딩 구간 동안 JS Heap 메모리가 11.1MB~22.5MB 대에서 안정적으로 할당 및 관리되는 쾌적한 환경을 구축했습니다.
					`,
				},
			],
		},
		{
			tab: "Performance",
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
						별도로 구축한 REST API 서버와 연동하여 메인 화면에서 직접 이메일을 전송할 수 있는 폼(Form)을 구현했습니다.
						사용자 편의를 위해 API 서버의 Health Check를 실시간(Polling)으로 체크하여 결과를 UI에 표시하고,
						불필요한 리소스 낭비를 방지하기 위해 입력 폼이 뷰포트를 벗어나거나 브라우저 탭이 비활성화될 경우
						**상태 체크를 일지 정지**합니다.
					`,
				},
			],
		},



		{
			tab: "CI/CD",
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "image",
						src: vercelDeployments,
						alt: "Vercel의 Deployments 페이지 화면",
						caption: "Vercel Deployments 페이지에서 확인할 수 있는 Production 및 Preview 배포 내역",
					},
					text: `
						Vercel 기반 Production 및 Preview 배포를 GitHub Actions를 통해 자동화했습니다.
						Preview는 main 브랜치를 대상으로 PR을 열거나 Push 이벤트가 발생하면 배포되며,
						Production은 Release가 게시되면 배포되도록 구성했습니다.
					`,
				},
			],
		},
		{
			tab: "CI/CD",
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "image",
						src: deployURLActionsSummary,
						alt: "GitHub Actions Job Summary에 게시된 배포 URL",
					},
				},
			],
		},
		{
			tab: "CI/CD",
			maxWidth: 1100,
			linkedToPrevious: true,
			blocks: [
				{
					media: {
						type: "image",
						src: deployURLInPrComment,
						alt: "GitHub PR 코멘트에 게시된 배포 URL",
					},
				},
			],
		},
		{
			tab: "CI/CD",
			maxWidth: 1100,
			linkedToPrevious: true,
			blocks: [
				{
					text: `
						매번 달라지는 Preview 배포 URL을 쉽게 확인할 수 있도록
						GitHub Actions를 통해 배포된 URL을 Job Summary 및 PR 코멘트에 자동으로 게시되도록 구성했습니다.
						[Workflow](https://github.com/kimzuni/portfolio/blob/main/.github/workflows/preview.yml#L41-L61)
					`,
				},
			],
		},
	],
};
