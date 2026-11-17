import type { ItemRaw } from "../types";

import dashboard from "./dashboard.png";
import controller from "./controller.png";
import firewallDaemon from "./firewall-daemon.png";
import detailSheet from "./detail-sheet.png";
import tray from "./tray.png";



export const item: ItemRaw = {
	pin: true,
	cover: dashboard,
	name: "Ransom0",
	team: 3,
	description: `
		랜섬웨어 공격을 실시간으로 탐지 및 차단하고, WFP(Windows Filtering Platform) 기반으로 C2 통신을 방지하는 보안 및 위협 대응 시스템입니다.
		프로세스 제어와 화이트리스트 기반 네트워크 격리를 통해 사용자 자산 침해를 사전에 방지합니다.
	`,
	highlights: [
		{
			label: "Real-time Monitoring",
			value: "실시간 공격 탐지 Tray/Toast 경보 시스템 구축",
		},
		{
			label: "Cross Platform",
			value: "Electron 기반의 Windows, Linux, macOS용 UI 개발",
		},
		{
			label: "WFP Firewall Isolation",
			value: "WFP 기반 네트워크 격리 및 화이트리스트 제어 도구 개발",
		},
		{
			label: "Cross-Platform IPC",
			value: "Named Pipe(Windows) 및 Socket(Linux/macOS) 기반 IPC 채널 구현",
		},
		{
			label: "Build & Deployment",
			value: "GitHub Actions 기반 Windows, Linux용 실행 파일 빌드 및 배포 자동화",
		},
	],
	period: [
		new Date("2026-08-31"),
		new Date("2026-12-12"),
	],
	tags: [
		"frontend",
		"backend",
		"security",
	],
	skills: {
		primary: [
			"typescript",
			"electron",
			"node-js",
		],
		secondary: [
			"javascript",
			"react",
			"zustand",
			"shadcn-ui",
			"tailwind-css",
			"ipc",
			"sqlite",
			"cpp",
			"github-actions",
		],
	},
	links: [
		{
			label: "GitHub(UI)",
			href: "https://github.com/ransomguard/ui",
		},
		{
			label: "GitHub(Firewall)",
			href: "https://github.com/ransomguard/firewall-manager",
		},
	],
	articles: [
		{
			tab: "UI",
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "image",
						src: dashboard,
						alt: "Ransom0 UI Overview",
						caption: "Ransom0 UI 대시보드 화면",
					},
					text: `
						커널 및 상관분석 엔진에서 발생한 이벤트를 실시간으로 모니터링하고, 이벤트에 대한 상세 정보를 제공하는 UI 대시보드입니다.
						Cross Platform을 지원하기 위해 Named Pipe(Windows) 및 Socket(Linux, macOS) 기반 IPC 통신을 구현하여 커널 및 상관분석 엔진과의 안정적인 통신을 보장합니다.
					`,
				},
			],
		},

		{
			tab: "UI",
			blocks: [
				{
					colSpan: 10,
					media: {
						type: "image",
						src: controller,
						alt: "Ransom0 UI Controller",
						caption: "Ransom0 UI 컨트롤러 화면",
					},
				},
				{
					colSpan: 3,
					media: {
						type: "image",
						src: detailSheet,
						alt: "Ransom0 UI Detail Sheet",
						caption: "Ransom0 UI 디테일 시트 화면",
					},
				},
			],
		},
		{
			tab: "UI",
			linkedToPrevious: true,
			blocks: [
				{
					text: `
						엔진에서 차단한 프로세스 목록과 네트워크 전체 차단 시 구성할 화이트리스트를 관리할 수 있습니다.
						또한 모든 페이지에서 이벤트 클릭 시 상세 정보를 확인할 수 있는 시트가 제공됩니다.
					`,
				},
			],
		},

		{
			tab: "UI",
			maxWidth: 750,
			blocks: [
				{
					media: {
						type: "image",
						src: tray,
						alt: "Ransom0 UI Tray",
						caption: "Ransom0 UI 트레이 알림",
					},
					text: `
						랜섬웨어 공격에 대한 실시간 모니터링 및 알림(Toast & Tray) 기능을 제공합니다.
					`,
				},
			],
		},



		{
			tab: "Firewall",
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "image",
						src: firewallDaemon,
						alt: "Ransom0 Firewall Daemon",
						caption: "Ransom0 Firewall Daemon 로그 및 IPC 통신 요청/응답 결과",
					},
					text: `
						방화벽 데몬은 WFP(Windows Filtering Platform)를 관리하는 전용 도구로, 엔진에서 위협 탐지 시 전체 네트워크를 차단하기 위해 사용됩니다.
						IPC 통신을 통해 데몬을 종료하지 않고 차단 기능을 On/Off 할 수 있으며, 현재 구성된 화이트리스트 목록을 조회하거나 새롭게 설정할 수 있습니다.
					`,
				},
			],
		},
	],
};
