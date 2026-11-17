import type * as seo from "@/lib/seo";
import * as markdown from "@/lib/markdown";
import { constants } from "@/config";



export const _item: ItemRaw = {
	label: "About Me",
	title: "개발자의 시선을 가진 모의해커, 김준희입니다.",
	introduction: `
		개발자의 시선으로 시스템의 구조적 결함과 근본적인 문제를 파고듭니다.
		웹 개발, 리눅스 시스템, 침투 테스트 등 다양한 경험을 바탕으로
		단순한 블랙박스 스캔을 넘어 "개발자가 어디서 실수하기 쉬운가"를 집요하게 분석하여 잠재된 취약점을 찾아냅니다.

		이론에 머무르지 않고 다양한 실전 환경과 침투 시나리오를 경험해 왔습니다.
		모의해킹 실무 및 취약점 분석 과목을 최우수 성적으로 이수하고,
		총 12회의 CTF와 모의 침투 실습을 통해 실전 공격 기법을 탄탄히 다졌습니다.
		특히 정보수집부터 쉘 획득, 계정 탈취까지 이어지는 전 과정을 수행하며 타겟을 다각도로 분석하는 실전 감각을 길렀습습니다.

		필요한 도구는 직접 제작해서라도 진단 생산성과 완성도를 높입니다.
		SQLMap을 Bash로 자동화한 \`sqlmapbash\`를 오픈소스로 개발하는 등 반복 작업을 스크립트화하는 툴링 역량을 갖추었습니다.
		공격자의 시선으로 취약점을 먼저 식별하고, 개발팀이 즉시 납득하고 조치할 수 있는 최적의 방안을 함께 제시하는 모의해커를 지향합니다.
	`,
	features: [
		{
			label: "Offensive Analysis",
			description: `
				주요 웹/앱 취약점의 메커니즘을 깊이 이해하며,
				정찰부터 권한 탈취까지 이어지는 실전 침투 시나리오를 설계하고 검증합니다.
			`,
		},
		{
			label: "Code-Level Insight",
			description: `
				단순한 표면 스캔을 넘어,
				개발자의 시선으로 소스코드와 비즈니스 로직의 구조적 결함을 파고듭니다.
			`,
		},
		{
			label: "Tooling & Automation",
			description: `
				반복적인 진단 비효율을 방치하지 않고,
				필요한 도구는 직접 개발해서라도 진단 생산성을 극대화합니다.
			`,
		},
	],
	educations: [
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
			link: `${constants.SITE.cdn}/credentials/awards/2023-national-creative-coding-contest.pdf`,
		},
		{
			date: new Date("2023-11-02"),
			title: "제8회 Y.CTF",
			issuer: "영남이공대학교 사이버보안스쿨",
			rank: "우수상",
			link: `${constants.SITE.cdn}/credentials/awards/2023-y-dot-ctf.pdf`,
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
