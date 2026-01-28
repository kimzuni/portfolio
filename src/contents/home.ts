import type { HomeHeroData } from "@/app/_components/page/hero";
import type { HomeAboutData } from "@/app/_components/page/about";
import type { HomeSkillsData } from "@/app/_components/page/skills";

import { about as aboutContent } from "./about";
import { skills as skillsContent } from "./skills";



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
