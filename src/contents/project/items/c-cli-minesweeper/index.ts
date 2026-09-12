import type { ItemRaw } from "../types";

import start from "./start.png";
import play from "./play.png";



export const item: ItemRaw = {
	cover: play,
	name: "지뢰찾기 (C CLI)",
	description: `
		학기 중 C 언어 스터디에 참여하여 리눅스 터미널 환경에서 동작하는 지뢰찾기 게임을 구현한 토이 프로젝트입니다.
		키보드를 통해 커서를 이동하고, 지뢰를 피하며 안전한 블록을 열어가는 게임 로직을 C 언어로 작성했습니다.
	`,
	period: [
		new Date("2022-11-20"),
		new Date("2022-11-22"),
	],
	tags: [
		"toy-project",
	],
	skills: {
		primary: [
			"c",
		],
	},
	links: [
		{
			label: "GitHub",
			href: "https://github.com/jh1950/study/blob/main/c/project/mines.c",
		},
	],
	articles: [
		{
			blocks: [
				{
					media: {
						type: "image",
						src: start,
						alt: "터미널에서 C 기반 지뢰찾기를 실행한 화면",
						caption: "터미널 환경에서 게임을 실행하여 난이도 및 격자 크기를 입력받는 화면",
					},
				},
				{
					media: {
						type: "image",
						src: play,
						alt: "터미널에서 플레이 중인 C 기반 지뢰찾기 게임",
						caption: "터미널 환경에서 플레이 중인 지뢰찾기 화면. 테두리의 축별 화살표로 현재 커서 위치를 나타냅니다.",
					},
				},
			],
		},
		{
			linkedToPrevious: true,
			blocks: [
				{
					text: `
						### 주요 구현 내용

						- **동적 보드 및 난이도 시스템:** 사용자가 입력한 난이도와 격자 크기에 맞춰 2차원 배열을 동적으로 구성하고, 랜덤 함수를 이용해 지뢰를 무작위로 배치합니다.
						- **재귀적 연쇄 오픈 (Flood Fill):** 지뢰가 없는 빈 블록을 선택했을 때 인접한 영역이 연쇄적으로 열리도록 재귀 탐색 알고리즘을 적용했습니다.
						- **실시간 키 입력 처리:** \`conio\` 라이브러리의 \`getch\` 함수 대신 \`termios\` 라이브러리를 활용해 리눅스 터미널 환경에서 엔터 입력 없이 키 스트로크를 실시간으로 받아오도록 구현했습니다.
					`,
				},
			],
		},
	],
};
