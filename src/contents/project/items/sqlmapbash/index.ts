import type { ItemRaw } from "../types";

import inputScan from "./input-scan.png";
import dbList from "./db-list.png";
import tableList from "./table-list.png";
import dataDump from "./data-dump.png";



export const item: ItemRaw = {
	cover: dbList,
	name: "sqlmapbash (SQLMap 인터랙티브 래퍼)",
	description: `
		SQLMap의 복잡한 CLI 옵션과 방대한 스캔 결과 분석을 직관적인 대화형 CLI 인터페이스로 래핑한 침투 진단 테스트 도구입니다.
		한 번의 파라미터 입력으로 취약점 유무 검증, 백엔드 DBMS 식별, 데이터베이스 및 테이블 구조 탐색, 데이터 덤프 및 인메모리 캐싱까지 전 과정을 지원합니다.
	`,
	highlights: [
		{
			label: "Automated Pipeline",
			value: "SQLMap 스캔 단순화 및 멀티 터미널 활용 실시간 진행 상황 시각화",
		},
		{
			label: "Vulnerability Validation",
			value: "SQLMap 결과 분석을 통한 SQLi Type, 페이로드 등 핵심 정보 추출",
		},
		{
			label: "Hierarchical Navigation",
			value: "데이터베이스 및 테이블 목록을 번호 선택형 대화형 메뉴로 구조화",
		},
		{
			label: "In-Memory Cache & Paging",
			value: "결과 캐싱으로 중복 스캔 제거 및 `less -S` 기반 가독성 높은 결과 뷰어 구현",
		},
	],
	period: [
		new Date("2023-10-26"),
		new Date("2023-11-06"),
	],
	tags: [
		"security",
		"open-source",
		"dev-tools",
		"toy-project",
	],
	skills: {
		primary: [
			"bash",
			"sqlmap",
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
						caption: "DVWA 환경을 타겟으로 한 초기 구성 입력 및 자동 스캔 과정",
					},
					text: `
						### 1. 스캔 자동화 및 실시간 결과 가시화

						SQLMap의 수많은 CLI 플래그를 매번 조합하는 비효율을 개선하기 위해 진단 자동화 파이프라인을 구축했습니다.

						- **스캔 옵션 자동 조합**: 대상 URL, Method, Cookie, Parameter/FormData 입력 시 자동으로 옵션을 구성하여 스캔합니다.
						- **실시간 다중 터미널 감지 및 가시화**: 별도의 터미널 창을 띄워 실시간 스캔 과정을 출력함과 동시에 후속 분석에 활용합니다.
						- **결과 분석 및 핵심 정보 추출**: 스캔 결과를 분석하여 실제 인젝션 취약점이 존재하는지 확인하고, DBMS 종류 및 버전, SQLi Type, 페이로드 등 핵심 정보를 추출합니다.
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
						caption: "상시 헤더 및 탐색된 데이터베이스 계층 메뉴",
					},
				},
				{
					media: {
						type: "image",
						src: tableList,
						alt: "특정 데이터베이스 내의 테이블 목록을 보여주는 대화형 메뉴",
						caption: "선택한 데이터베이스 내부의 테이블 목록 메뉴",
					},
				},
			],
		},
		{
			linkedToPrevious: true,
			blocks: [
				{
					text: `
						### 2. 상시 진단 헤더 및 2단계 대화형 계층 탐색

						터미널 환경에서 Bash 및 리눅스 명령어를 조합한 대화형 CLI 메뉴 인터페이스를 설계했습니다.

						- **상시 컨텍스트 헤더**: 화면 상단에 현재 진단 대상의 사용자 입력값과 식별된 DBMS, 탐지된 SQLi Type을 상시 고정 출력합니다.
						- **페이로드 상세 토글**: 메뉴에서 \`-1\`을 입력하면 \`PAYLOAD=(Hide Display)\` 토글 로직이 동작하여 실제 스캔에 사용된 SQLi 페이로드를 열람하거나 숨길 수 있습니다.
						- **대화형 2단계 계층 탐색**: 조회된 모든 데이터베이스에 대해 테이블 목록을 사전 수집하여 Bash 연관 배열에 구조화하고, 번호 입력만으로 데이터베이스-테이블 목록 View을 양방향으로 자유롭게 탐색할 수 있습니다.
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
						caption: "DVWA users 테이블 데이터 덤프, 연관 배열 캐싱 및 less 페이징 뷰어",
					},
					text: `
						### 3. 데이터 덤프 파싱, 연관 배열 캐싱 및 페이징 최적화

						테이블 내 민감 데이터 추출 시 데이터 정제와 뷰어 편의성을 극대화했습니다.

						- **덤프 데이터 정제**: 데이터 스캔 결과에서 불필요한 로그를 제거하고 실제 데이터 테이블 그리드 영역만 추출하고, 대용량 테이블일 경우 스킵 표기 처리하여 터미널 응답성을 유지합니다.
						- **연관 배열 기반 인메모리 캐싱**: 한 번 덤프한 데이터는 메모리에 캐싱하여 추후 테이블을 재조회할 때 반복적인 SQLMap 스캔을 방지하여 진단 시간을 대폭 단축했습니다.
						- **\`less\` 기반 터미널 페이징**: 긴 출력 결과의 줄바꿈으로 인한 가독성 저하를 방지하기 위해 방향키로 스크롤이 가능한 \`less -S\` 명령어를 파이프라인으로 연결했습니다.
					`,
				},
			],
		},
	],
};
