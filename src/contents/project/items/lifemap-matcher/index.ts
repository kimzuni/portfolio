import type { ItemRaw } from "../types";

import infraSelect from "./infra-select-page.png";
import onboarding from "./fill-onboarding-page.png";
import home from "./home.png";
import map from "./split-desktop-mobile-map.png";
import dialog from "./item-dialog.png";
import database from "./property-infra-database.png";
import imageSizeOptimization from "./docker-image-size-optimization-result.png";



export const item: ItemRaw = {
	pin: true,
	cover: map,
	name: "라이프맵 매처",
	team: 4,
	description: `
		사용자가 설정한 조건을 기준으로 서울 내 최적의 주거지 Top 10을 추천해주는 웹 서비스입니다.
		단순 가격 비교를 넘어 역세권, 대형병원, 학군 등 다양한 요소를 종합 분석하여 순위를 제공합니다.
	`,
	highlights: [
		{
			label: "Optimization",
			value: "멀티 스테이지 빌드를 활용한 컨테이너 이미지 용량 88% 감소 (1.01GB &rarr; 123MB)",
		},
		{
			label: "Interactive UI",
			value: "카카오맵 API와 반응형 레이아웃으로 직관적인 지도 탐색 UX 제공",
		},
		{
			label: "Spatial Data Processing",
			value: "GIS 공간 데이터 기반(POINT 타입) 주거지-인프라 간 거리 연산",
		},
		{
			label: "Weighted Scoring",
			value: "주변 인프라 가중치를 종합적으로 반영한 Top 10 주거지 추천 로직 구현",
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
		"ci-cd",
	],
	skills: {
		primary: [
			"fastapi",
			"mariadb",
			"redis",
			"typescript",
			"react",
			"docker",
		],
		secondary: [
			"python",
			"sqlalchemy",
			"javascript",
			"zustand",
			"react-query",
			"tailwind-css",
			"shadcn-ui",
			"vite",
			"github-actions",
			"aws",
		],
	},
	links: [
		{
			label: "GitHub(Setup)",
			href: "https://github.com/team-overclock/lifemap-matcher",
		},
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
			tab: "Image Size Optimization",
			maxWidth: 1100,
			blocks: [
				{
					media: {
						type: "image",
						src: imageSizeOptimization,
						alt: "컨테이너 이미지 용량 최적화 전후 비교",
						caption: "멀티 스테이지 빌드를 활용한 컨테이너 이미지 용량 최적화 결과",
					},
					text: `
						기존의 단일 빌드 방식을 멀티 스테이지 빌드로 전환하여 불필요한 빌드 타임 의존성을 최종 결과물에 포함하지 않도록 최적화함으로써,
						프론트엔드 이미지 용량을 **약 88%**(1.01GB &rarr; 123MB),
						백엔드 이미지 용량을 **약 58%**(1.41GB &rarr; 581MB) 감소시켰습니다.
					`,
				},
			],
		},



		{
			tab: "Main",
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
						데이터가 업데이트된 날짜를 기록하여 거리가 최신화되지 않은 경우에만 업데이트를 수행하도록 하여 효율성을 높였습니다.
					`,
				},
			],
		},
		{
			tab: "Main",
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
			tab: "Main",
			linkedToPrevious: true,
			blocks: [
				{
					text: `
						사용자는 원하는 조건의 동네, 인프라 유형, 가격 범위를 선택할 수 있습니다.
						인프라의 경우 선택한 순서대로 우선순위가 적용되며, 특정 인프라는 상세 조건을 함께 설정할 수 있습니다.
						Zustand 및 TanStack Query를 활용하여 선택한 조건을 전역 상태로 관리하고, 페이지 이동 시에도 선택한 조건이 유지되도록 구현했습니다.
					`,
				},
			],
		},
		{
			tab: "Main",
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
			tab: "Main",
			linkedToPrevious: true,
			blocks: [
				{
					text: `
						사용자가 요청한 조건을 기반으로 추천된 주거지들을 카카오맵 위에 시각화되어 표시됩니다.
						추천 목록에서 아이템을 클릭하면 해당 위치로 지도가 이동하며 마커 위에 요약 정보가 표시됩니다.
						특정 아이템에 대한 상세 보기를 누르면 상세 정보를 확인할 수 있는 다이얼로그가 표시되며,
						사용자는 이를 통해 주변 인프라와의 거리, 가격 등 다양한 정보를 확인할 수 있습니다.
					`,
				},
			],
		},
		{
			tab: "Main",
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
