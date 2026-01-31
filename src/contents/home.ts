import type { HomeHeroData } from "@/app/_components/page/hero";
import type { HomeAboutData } from "@/app/_components/page/about";
import type { HomeSkillsData } from "@/app/_components/page/skills";
import type { HomeProjectsData } from "@/app/_components/page/projects";
import type { HomeContactData } from "@/app/_components/page/contact";

import { about as aboutContent } from "./about";
import { skills as skillsContent } from "./skills";
import { projects as projectItems } from "./projects";
import { contact as contactItems } from "./contact";



export const hero: HomeHeroData = {
	heading: "KIM JOON HEE",
	subheading: "Full-stack Developer",
	tagline: [
		"무언가에 깊게 빠져드는 것을 좋아합니다.",
		"서비스를 만드는 데 필요한 것이라면 영역을 가리지 않고 다루고 있습니다.",
	],
	buttons: [
		{
			variant: "default",
			label: "Read More",
			href: "#about",
			size: "lg",
			icon: "ArrowDown",
			iconTranslateY: 5,
			iconPosition: "right",
		},
	],
};



export const about: HomeAboutData = {
	message: "안녕하세요! 아, 제가 누구냐구요?",
	heading: aboutContent.introduction.heading,
	philosophy: aboutContent.philosophy,
	certificates: aboutContent.certificates.length,
	awards: aboutContent.awards.length,
	button: {
		variant: "default",
		label: "More about me",
		href: "/about",
		size: "lg",
		icon: "ArrowRight",
		iconTranslateX: 5,
		iconPosition: "right",
	},
};



export const skills: HomeSkillsData = {
	heading: "What I Use",
	message: "프로젝트를 진행할 때 주로 사용하는 기술들이에요!",
	items: skillsContent,
};



export const projects: HomeProjectsData = {
	heading: "What I Built",
	message: "작지만 소중한 프로젝트들, 앞으로도 계속 채워집니다!",
	linkButton: {
		variant: "outline",
		label: "More Projects",
		size: "lg",
		icon: "ArrowRight",
		iconTranslateX: 5,
		iconPosition: "right",
	},
	items: projectItems,
};



export const contact: HomeContactData = {
	heading: "Get In Touch",
	message: "제가 해야 할 일이 있나요? 언제든지 편하게 말씀해 주세요!",
	iconSize: "lg",
	items: contactItems,
};
