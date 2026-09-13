import type { ItemRaw } from "../types";

import infraSelect from "./infra-select-page.png";
import onboarding from "./fill-onboarding-page.png";
import home from "./home.png";
import map from "./split-desktop-mobile-map.png";
import dialog from "./item-dialog.png";
import database from "./property-infra-database.png";



export const item: ItemRaw = {
	pin: true,
	cover: map,
	name: "라이프맵 매처",
	description: `
		사용자가 설정한 조건을 기준으로 서울 내 최적의 주거지를 추천해주는 웹 서비스입니다.
		단순 가격 비교를 넘어 주변 인프라, 교통 편의성, 학군 등 다양한 요소를 종합 분석하여 사용자 맞춤형 순위를 제공합니다.
	`,
	highlights: [
		{
            label: "Spatial Data Processing",
            value: "GIS 공간 데이터 기반(POINT 타입) 주거지-인프라 간 거리 연산",
        },
		{
            label: "Weighted Scoring",
            value: "주변 인프라 가중치를 종합적으로 반영한 Top 10 주거지 추천 로직 구현",
        },
        {
            label: "Interactive UI",
            value: "카카오맵 API와 반응형 레이아웃으로 직관적인 지도 탐색 UX 제공",
        },
        {
            label: "Infrastructure",
            value: "멀티 스테이지 빌드를 활용한 컨테이너 이미지 최적화 및 Prod/Dev 환경 분리",
        },
	],
	period: [
		new Date("2026-03-03"),
		new Date("2026-06-16"),
	],
	tags: [
		"backend",
		"frontend",
		"container",
		"cloud",
	],
	skills: {
		primary: [
			"python",
			"fastapi",
			"sqlalchemy",
			"mariadb",
			"redis",
			"typescript",
			"javascript",
			"react",
			"tailwind-css",
			"shadcn-ui",
			"vite",
			"docker",
		],
		secondary: [
			"github-actions",
			"aws",
		],
	},
	team: {
		size: 4,
		contributions: [
			{
				label: "Planning",
				percentage: 25,
				description: [
					"주제 선정 및 기획 방향성 논의",
					"생활 인프라 가중치, 필터링 등 주요 기능 요구사항 논의",
					"개발 진행 상황 공유 및 산출물 조율을 위한 전반적인 팀 커뮤니케이션 참여",
				],
			},
			{
				label: "Initial Prototyping",
				percentage: 0,
			},
			{
				label: "Frontend",
				percentage: 100,
				description: [
					"단일 `.html` 파일로 구성된 프로토타입을 TypeScript 및 React 기반으로 재설계 및 구현",
					"백엔드 REST API 연동 및 Zustand 기반 전역 상태 관리, TanStack Query 기반 캐싱 활용",
					"API 요청/응답 데이터의 런타임 스키마 검증(Validation), 네이밍 컨벤션(Case) 자동 변환 인터셉터 적용",
					"카카오맵 API 연동 및 추천 결과의 위치를 마커로 시각화 및 모바일 환경에 최적화된 바텀시트 UI 구현",
				],
			},
			{
				label: "Backend",
				percentage: 80,
				description: [
					"FastAPI 기반 REST API 서버 구축 및 SQLAlchemy를 활용한 데이터베이스 ORM 설계",
					"Argon2 해시 알고리즘을 통한 보안 강화 및 Redis 기반 캐싱을 도입하여 데이터 조회 성능 최적화",
					"대용량 공공데이터의 효율적 관리를 위해 `gdown`와 version.txt 기반의 조건부 자동 업데이트 파이프라인 구축",
					"GeoAlchemy2 및 Geopandas를 활용한 공간 데이터(GIS) 쿼리 처리 및 인프라 가중치 기반 스코어링 알고리즘 개발",
				],
			},
			{
                label: "Deployment & Infra",
                percentage: 100,
                description: [
                    "Docker 및 Docker Compose 기반 멀티 컨테이너 환경 구축과 개발/운영(Dev/Prod) 환경 분리",
                    "Frontend 및 Backend 멀티 스테이지 빌드 적용을 통한 컨테이너 이미지 최적화",
                    "Linuxserver 팀의 Alpine 베이스 이미지 및 s6-overlay 기반의 서비스 초기화 및 실행 스크립트 작성",
                    "호스트와 컨테이너 간 `PUID`/`PGID` 매핑 및 파일 권한 동기화를 통한 볼륨 마운트 권한 이슈 차단",
                ],
            },
		],
	},
	links: [
		{
			label: "GitHub(Frontend)",
			href: "https://github.com/team-overclock/frontend",
		},
		{
			label: "GitHub(Backend)",
			href: "https://github.com/team-overclock/backend",
		},
	],
	articles: [
		{
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "image",
						src: database,
						alt: "주거지-인프라 연관 관계 및 추가 속성 데이터 매핑 테이블",
						caption: "주거지와 주변 인프라 간의 거리 기반 점수 데이터 조회 화면",
					},
					text: `
						주거지와 지하철역, 학교 등 공공 데이터 기반의 좌표 정보를 기반으로 주거지-인프라 간 거리 계산을 수행하고, 이를 통해 각 아이템의 점수를 산출합니다.
						사용자가 선택한 인프라 우선순위에 따라 가중치를 적용하여 최종 점수를 계산하고, 이를 기반으로 상위 10개의 주거지를 추천합니다.
						데이터가 업데이트된 날짜를 기록하여 거리를 재계산할 필요가 있는 경우에만 업데이트를 수행하도록 하여 효율성을 높였습니다.
					`,
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: onboarding,
						alt: "선택이 완료된 온보딩 페이지",
						caption: "추천을 요청하기 위해 사용자가 선호하는 조건을 선택하는 온보딩 페이지",
					},
				},
				{
					media: {
						type: "image",
						src: infraSelect,
						alt: "인프라 선택 페이지",
						caption: "사용자가 선호하는 인프라 및 우선순위를 결정하는 페이지",
					},
				},
			],
		},
		{
			linkedToPrevious: true,
			blocks: [
				{
					text: `
						사용자는 원하는 조건의 동네, 인프라 유형, 가격 범위를 선택할 수 있습니다.
						인프라의 경우 선택한 순서대로 우선순위가 적용되며, 특정 인프라는 상세 조건을 함께 설정할 수 있습니다.
						동네, 인프라, 상세 조건의 데이터는 백엔드를 통해 동적으로 가져와 로컬 스토리지에 캐싱하여 사용하며,
						사용자가 선택한 조건은 세션 스토리지와 동기화되어 페이지 이동 시에도 선택한 조건을 유지할 수 있도록 구현했습니다.
					`,
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: map,
						alt: "추천 결과 페이지",
						caption: "사용자가 요청한 조건을 기반으로 추천된 주거지들을 지도 위에 시각화하여 보여주는 페이지",
					},
				},
				{
					media: {
						type: "image",
						src: dialog,
						alt: "추천 결과 상세 정보 다이얼로그",
						caption: "추천 결과 중 특정 주거지의 상세 정보를 보여주는 다이얼로그",
					},
				},
			],
		},
		{
			linkedToPrevious: true,
			blocks: [
				{
					text: `
						사용자가 요청한 조건을 기반으로 추천된 주거지들을 지도 위에 시각화되어 표시됩니다.
						추천 목록에서 아이템을 클릭하면 해당 위치로 지도가 이동하며 마커 위에 요약 정보가 표시됩니다.
						특정 아이템에 대한 상세 보기를 누르면 상세 정보를 확인할 수 있는 다이얼로그가 표시되며,
						사용자는 이를 통해 주변 인프라와의 거리, 가격 등 다양한 정보를 확인할 수 있습니다.
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
						src: home,
						alt: "추천 요청 목록 페이지 (메인 페이지)",
						caption: "사용자가 추천을 요청한 목록을 확인할 수 있는 메인 페이지",
					},
					text: `
						메인 페이지에는 사용자가 요청한 추천 목록이 표시되며, 각 요청에 대한 상태를 확인할 수 있습니다.
						요청 목록이 없는 경우 온보딩 페이지로 리다이렉트되어 추천 요청을 진행하도록 안내합니다.
					`,
				},
			],
		},
	],
};
