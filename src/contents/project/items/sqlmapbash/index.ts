import type { ItemRaw } from "../types";

import inputScan from "./input-scan.png";
import dbList from "./db-list.png";
import tableList from "./table-list.png";
import dataDump from "./data-dump.png";



export const item: ItemRaw = {
	cover: dbList,
	name: "sqlmapbash (SQLMap 인터랙티브 래퍼)",
	description: `
		SQL 인젝션 진단 도구인 SQLMap을 대화형 CLI로 사용할 수 있도록 래핑한 Bash 스크립트입니다.
		복잡한 옵션 입력과 결과 확인 과정을 자동화하고 시각화하기 위해 개발했습니다.
	`,
	period: [
		new Date("2023-10-26"),
		new Date("2023-11-06"),
	],
	tags: [
		"security",
		"toy-project",
	],
	skills: {
		primary: [
			"bash",
		],
	},
	links: [
		{
			label: "GitHub",
			href: "https://github.com/jh1950/sqlmapbash",
		},
	],
	articles: [
		{
			maxWidth: 850,
			blocks: [
				{
					media: {
						type: "image",
						src: inputScan,
						alt: "URL 및 파라미터 입력 후 취약점 스캔 진행 화면",
						caption: "DVWA 환경을 타겟으로 한 초기 입력 및 자동 스캔 과정",
					},
					text: `
						### 1. 직관적인 파라미터 입력 및 자동 진단

						대상 URL, 쿠키, 타겟 파라미터만 입력하면 즉시 SQLMap 스캔이 시작됩니다.
						시스템에 설치된 터미널(\`xterm\`, \`gnome-terminal\`)를 자동 감지하여 새 창에서 실시간 스캔 과정을 시각적으로 보여주며,
						환경이나 옵션에 따라 백그라운드에서 조용히 실행되도록 제어할 수도 있습니다.
						메인 터미널에서는 사용자가 스캔 진행 상황을 쉽게 확인할 수 있도록 각 작업 단계의 완료 여부를 \`[ OK ]\` 로그로 직관적으로 표출합니다.
					`,
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: dbList,
						alt: "데이터베이스 목록을 보여주는 대화형 메뉴",
						caption: "탐색된 데이터베이스 목록",
					},
				},
				{
					media: {
						type: "image",
						src: tableList,
						alt: "특정 데이터베이스 내의 테이블 목록을 보여주는 대화형 메뉴",
						caption: "선택한 데이터베이스 내부의 테이블 목록",
					},
				},
			],
		},
		{
			linkedToPrevious: true,
			blocks: [
				{
					text: `
						### 2. CLI 기반의 인터랙티브 메뉴 탐색

						방대한 SQLMap의 표준 출력(stdout) 결과물에서 데이터베이스와 테이블 이름만 정규식으로 파싱하여 대화형 메뉴로 렌더링합니다.
						복잡한 추가 명령어 타이핑 없이, 숫자 입력만으로 단계(DB -> Table)를 자유롭게 탐색할 수 있으며,
						\`-1\` 입력을 통해 취약점 유형별 실제 인젝션 페이로드 상세 내역을 토글(Display/Hide)하여 즉시 확인할 수 있습니다.
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
						src: dataDump,
						alt: "users 테이블의 데이터가 덤프된 화면",
						caption: "DVWA users 테이블 데이터 덤프 및 시각화 결과",
					},
					text: `
						### 3. 데이터 덤프 및 인메모리 캐싱

						테이블 선택 시 덤프된 데이터를 깔끔한 표 형태로 가공하여 출력합니다.
						컬럼이 많거나 데이터가 길 경우 터미널에서 강제 줄바꿈이 발생해 가독성이 떨어지는 문제를 방지하기 위해 \`less -S\`명령어를 사용하며,
						이를 통해 화면 밖으로 넘어가는 긴 데이터도 방향키를 이용해 상하좌우로 자유롭게 스크롤하며 확인할 수 있도록 UX를 개선했습니다.
						또한 한 번 조회한 덤프 데이터는 Bash의 연관 배열(Associative Array)에 임시 캐싱하여, 재열람 시 불필요한 스캔 재실행을 방지하는 최적화 로직을 적용했습니다.
					`,
				},
			],
		},
	],
};
