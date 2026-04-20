import type { AboutData } from "@/app/about/page";



export const about: AboutData = {
	label: "About Me",
	metadata: {
		title: "About Me",
		description: "풀스택 개발자 김준희의 About 페이지입니다.",
	},
	introduction: {
		heading: "몰입의 즐거움을 아는 개발자, 김준희입니다.",
		messages: [
			"시간 가는 줄 모를 정도로 무언가에 깊게 빠져들어 본 경험이 있나요? 저에게는 개발이 그렇습니다.",
			"",
			"내가 만든 결과물이 사용자에게 전달되는 모든 과정을 소중히 여깁니다.",
			"긍정적인 피드백을 내일을 위한 양분으로 삼는다면, 부정적인 피드백은 저를 움직이게 하는 강력한 동력이 됩니다.",
			"",
			"어제보다 조금 더 나은 개발자가 되기 위해 오늘도 어김없이 배우고 고민합니다.",
		],
	},
	philosophy: [
		{
			label: "Why?",
			description: "단순히 기능을 구현하는 것에 그치지 않고, '왜 이 기술인가?', '이게 최선인가?'를 끊임없이 자문하며 근거 있는 코드를 작성합니다.",
		},
		{
			label: "Communication",
			description: "혼자 빠르게 가기보다 함께 멀리 가는 가치를 추구합니다. 다양한 관점을 존중하며 논의하는 과정을 통해 보다 더 나은 선택을 할 수 있다고 믿습니다.",
		},
		{
			label: "End-to-End",
			description: "프론트엔드와 백엔드 구현을 넘어, 리눅스 기반의 서버 환경과 배포 과정까지 직접 다뤄보며 서비스의 전체 흐름을 파악하고자 노력합니다.",
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
