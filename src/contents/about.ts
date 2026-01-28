import type { AboutData } from "@/app/about/page";



export const about: AboutData = {
	label: "About Me",
	metadata: {
		title: "About Me",
		description: "풀스택 개발자 김준희의 About 페이지입니다.",
	},
	introduction: {
		heading: "몰입의 즐거움을 아는 개발자 김준희입니다.",
		messages: [
			"시간 가는 줄 모를 정도로 무언가에 깊게 빠져들어 본 경험이 있나요? 저에게는 개발이 그렇습니다.",
			"프론트엔드와 백엔드 구현을 넘어, 기능이 실제로 동작하는 서버 환경과 배포 과정까지 직접 구성하며 개발을 이어왔습니다.",
			"내가 만든 것이 사용자에게 서비스되어 긍정적인 피드백을 받을 때 가장 큰 보람을 느낍니다.",
			"어제보다 조금 더 나은 개발자가 되기 위해 오늘도 배우고 고민하고 있습니다.",
		],
	},
	philosophy: [
		{
			label: "Why?",
			description: "단순히 코드가 동작하게 만드는 데서 멈추지 않고, '왜 이 기술을 사용하는가?', '이게 최선의 방법인가?'를 항상 고민합니다.",
		},
		{
			label: "Communication",
			description: "혼자 빠르게 가기보다 함께 성장하는 개발 문화를 중요하게 생각합니다. 각자의 관점을 존중하며 의견을 나누는 과정이 더 나은 구조와 선택으로 이어진다고 믿습니다.",
		},
		{
			label: "End-to-End",
			description: "필요하다고 판단되는 영역은 구분하지 않고 직접 다뤄보며, 서비스가 동작하는 전체 흐름을 경험해왔습니다.",
		},
	],
	education: [
		{
			period: [new Date("2019-02-27"), new Date("2025-02-07")],
			school: "영남이공대학교",
			major: "사이버보안과 (전문학사)",
			status: "졸업",
		},
		{
			period: [new Date("2026-02-27"), new Date("2027-02-07")],
			school: "영남이공대학교",
			major: "사이버보안학과 (학사)",
			status: "졸업 예정",
		},
	],
	certificates: [
		{
			date: new Date("2022-07-01"),
			title: "리눅스마스터 2급",
			issuer: "한국정보통신진흥협회",
		},
		{
			date: new Date("2023-02-21"),
			title: "네트워크관리사 2급",
			issuer: "한국정보통신자격협회",
		},
	],
	awards: [
		{
			date: new Date("2023-11-17"),
			title: "교내 창의코딩 경진대회",
			rank: "대상",
		},
		{
			date: new Date("2023-12-27"),
			title: "전국 창의코딩 경진대회",
			rank: "금상",
		},
	],
};

about.education.reverse();
about.certificates.reverse();
about.awards.reverse();
