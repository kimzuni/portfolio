import type * as seo from "@/lib/seo";
import * as markdown from "@/lib/markdown";
import { constants } from "@/config";



export const _item: ItemRaw = {
	label: "About Me",
	title: "몰입의 즐거움을 아는 개발자, 김준희입니다.",
	introduction: `
		15살 무렵, 마인크래프트 서버 구동기라 불리는 배치 스크립트 파일을 커스텀하여 친구들에게 공유한 경험이 있습니다.
		내가 원하던 대로 스크립트를 개선하고 친구들의 피드백을 반영하던 그 시절의 경험은,
		현재 사용자 경험(UX/DX)을 최우선으로 고려하며 신뢰할 수 있는 서비스를 개발하게 된 원동력이 되었습니다.

		가벼운 호기심으로 시작한 웹 개발 독학은 어느새 가장 즐거워하는 일이 되어 개발자라는 목표로 이어졌습니다.
		기초적인 프로그래밍 문법조차 낯설었던 1학년 시절을 지나,
		웹, 파이썬, C프로그래밍 등 주요 실습 과목에서 100점 만점을 포함해 최상위 성적(A+)을 기록하며 탄탄한 기본기를 다졌습니다.
		이를 바탕으로 2학년 무렵에는 교내 코딩대회 대상과 전국 대회 금상을 수상할 만큼 단기간에 가파른 성장을 경험했습니다.
		이러한 성장의 과정은 시작부터 리눅스 환경과 함께했습니다.
		전공 대비를 위해 가상머신과 외부 저장장치에 설치했던 리눅스를 이제는 메인 OS로 사용하고 있으며,
		개발 초기부터 터미널 환경을 마주한 덕분에 홈 서버와 클라우드 인스턴스를 직접 구축하고 다루는 일이 자연스러운 일상이 되었습니다.

		정보 보안의 3대 요소인 기밀성, 무결성, 가용성은 사용자의 신뢰를 지키기 위한 필수 요소입니다.
		인가된 사용자만 접근할 수 있는 안전한 API를 설계하고,
		철저한 검증으로 데이터 오염을 방지하며,
		어떤 상황에서도 무너지지 않는 안정적인 시스템 인프라를 구축하는
		단단한 개발을 지향합니다.

		어제보다 조금 더 나은 개발자가 되기 위해 오늘도 어김없이 배우고 고민합니다.
	`,
	features: [
		{
			label: "Execution",
			description: `
				낯선 기술도 필요한 순간 망설임 없이 습득하며,
				단 며칠 만에 새로운 언어로 동작하는 웹 서버를 구축해 낼 만큼 빠른 실행력을 증명합니다.
			`,
		},
		{
			label: "Security",
			description: `
				사소한 실수로 인한 취약점을 절대 허용하지 않으며,
				검증된 오픈소스를 활용하여 안전하고 단단한 서비스를 구현합니다.
			`,
		},
		{
			label: "Deep-dive",
			description: `
				외부 라이브러리의 한계나 에러를 마주했을 때,
				내부 코드를 직접 수정해서라도 원하는 결과를 만들어 냅니다.
			`,
		},
	],
	educations: [
		{
			period: [new Date("2015-03-02"), new Date("2016-10-04")],
			school: "경북기계공업고등학교",
			type: "마이스터고등학교",
			major: "기계설계과",
			status: "중퇴",
		},
		{
			period: [new Date("2019-02-27"), new Date("2025-02-07")],
			school: "영남이공대학교",
			degree: "전문학사",
			major: "사이버보안과",
			status: "졸업",
			gpa: {
				scale: 4.5,
				value: 4.09,
			},
		},
		{
			period: [new Date("2026-02-27"), new Date("2027-02-07")],
			school: "영남이공대학교",
			type: "학사학위 전공심화과정",
			degree: "학사",
			major: "사이버보안학과",
			status: "졸업 예정",
		},
	],
	certifications: [
		{
			date: new Date("2022-07-01"),
			title: "리눅스마스터 2급",
			issuer: "한국정보통신진흥협회",
			link: `${constants.SITE.cdn}/credentials/certs/linux-master-2.pdf`,
		},
		{
			date: new Date("2023-02-21"),
			title: "네트워크관리사 2급",
			issuer: "한국정보통신자격협회",
			link: `${constants.SITE.cdn}/credentials/certs/network-advisor-2.pdf`,
		},
		{
			date: new Date("2026-09-11"),
			title: "정보처리기사",
			issuer: "한국산업인력공단",
			link: `${constants.SITE.cdn}/credentials/certs/engineer-information-processing.pdf`,
		},
	],
	training: [
		{
			period: [new Date("2024-10-24"), new Date("2024-10-26")],
			title: "Architecting on AWS",
			issuer: "Amazon Web Services",
			link: `${constants.SITE.cdn}/credentials/training/2024-architection-on-aws.pdf`,
			description: "AWS 클라우드 아키텍처 설계 원칙 및 인프라 구축 기초 과정",
		},
		{
			period: [new Date("2026-08-10"), new Date("2026-08-12")],
			title: "LLM 모델 파인튜닝 및 피지컬 AI 활용 실습",
			issuer: "영남이공대학교",
			link: `${constants.SITE.cdn}/credentials/training/2026-llm-finetuning-physical-ai.pdf`,
			description: "DGX 및 Jetson Thor 활용 실습",
		},
	],
	awards: [
		{
			date: new Date("2023-12-01"),
			title: "영이공 창의코딩 경진대회",
			issuer: "공학기술교육혁신센터",
			rank: "대상",
			link: `${constants.SITE.cdn}/credentials/awards/2023-ync-creative-coding-contest.pdf`,
		},
		{
			date: new Date("2023-12-27"),
			title: "전국 창의코딩 경진대회",
			issuer: "공학기술교육혁신센터",
			rank: "금상",
		},
	],
};



export const metadata: seo.MetadataOptions = {
	title: _item.label,
	description: _item.title,
};



export const item: Item = {
	..._item,
	introduction: await markdown.render(_item.introduction),
	features: await markdown.renders(_item.features, "description"),
	educations: _item.educations.sort((a, b) => b.period[1].getTime() - a.period[1].getTime()),
	certifications: _item.certifications.sort((a, b) => b.date.getTime() - a.date.getTime()),
	training: await markdown.renders(_item.training.sort((a, b) => b.period[1].getTime() - a.period[1].getTime()), "description"),
	awards: await markdown.renders(_item.awards.sort((a, b) => b.date.getTime() - a.date.getTime()), "description"),
};



export interface FeatureRaw {
	label: string;
	description: markdown.Source;
}

export interface Feature extends Omit<FeatureRaw, "description"> {
	description: markdown.Result;
}



export interface GPARaw {
	scale: number;
	value: number;
}

export interface GPA extends GPARaw {
}



export interface EducationRaw {
	period: [Date, Date];
	school: string;
	type?: string;
	degree?: "전문학사" | "학사";
	major: string;
	status: "중퇴" | "졸업" | "졸업 예정" | "수료";
	gpa?: GPARaw;
}

export interface Education extends Omit<EducationRaw, "gpa"> {
	gpa?: GPA;
}



export interface CertificateRaw {
	date: Date;
	title: string;
	issuer: string;
	link?: string;
}

export interface Certificate extends CertificateRaw {
}



export interface TrainingRaw {
	period: [Date, Date];
	title: string;
	issuer: string;
	description?: markdown.Source;
	link?: string;
}

export interface Training extends Omit<TrainingRaw, "description"> {
	description: markdown.Result;
}



export interface AwardRaw {
	date: Date;
	title: string;
	issuer: string;
	rank: string | number;
	description?: markdown.Source;
	link?: string;
}

export interface Award extends Omit<AwardRaw, "description"> {
	description: markdown.Result;
}



export interface ItemRaw {
	label: string;
	title: string;
	introduction: markdown.Source;
	features: FeatureRaw[];
	educations: EducationRaw[];
	certifications: CertificateRaw[];
	training: TrainingRaw[];
	awards: AwardRaw[];
}

export interface Item extends Omit<ItemRaw, "introduction" | "features" | "educations" | "certifications" | "training" | "awards"> {
	introduction: markdown.Result;
	features: Feature[];
	educations: Education[];
	certifications: Certificate[];
	training: Training[];
	awards: Award[];
}
