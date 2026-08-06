import type * as seo from "@/lib/seo";

import type { LinkButtonProps } from "@/components/link-button";
import type { AnchorButtonProps } from "@/components/anchor-button";

import * as _app from "./app";
import * as _hero from "./hero";
import * as _about from "./about";
import * as _skill from "./skill";
import * as _project from "./project";
import * as _contact from "./contact";



export const metadata: seo.MetadataOptions = {
	title: {
		absolute: _app.item.title,
	},
	description: _app.item.description.raw,
};



export interface Hero extends _hero.Item {
	anchorButton: AnchorButtonProps;
}

export const hero: Hero = {
	..._hero.item,
	anchorButton: {
		variant: "default",
		label: "Read More",
		targetId: "#about",
		size: "lg",
		icon: "ArrowDown",
		iconTranslateY: 5,
		iconPosition: "right",
	},
};



export interface About extends Pick<_about.Item, "philosophies"> {
	heading: string;
	message: string;
	certificates: number;
	awards: number;
	linkButton: LinkButtonProps;
}

export const about: About = {
	heading: _about.item.title,
	message: "안녕하세요! 아, 제가 누구냐구요?",
	philosophies: _about.item.philosophies,
	certificates: _about.item.certificates.length,
	awards: _about.item.awards.length,
	linkButton: {
		variant: "default",
		label: "More about me",
		size: "lg",
		icon: "ArrowRight",
		iconTranslateX: 5,
		iconPosition: "right",
	},
};



export interface Skill {
	group: _skill.category.group.Item;
	items: _skill.Item[];
}

export interface Skills {
	heading: string;
	message: string;
	items: Skill[];
}

const minLevel: _skill.level.Slug = 0;
export const skills: Skills = {
	heading: "What I Use",
	message: "프로젝트를 진행할 때 주로 사용하는 기술들이에요!",
	items: _skill.category.group.items.map(group => ({
		group,
		items: _skill.items.filter(x => (
			(!minLevel || x.level.slug >= minLevel)
			&& x.group.slug === group.slug
			&& !x.group.hidden
			&& !x.category.hidden
			&& !x.hidden
			&& x.pin
		)).sort((a, b) => (
			b.level.slug !== a.level.slug
				? b.level.slug - a.level.slug
				: a.label.localeCompare(b.label)
		)),
	})),
};



export interface Projects {
	heading: string;
	message: string;
	linkButton: LinkButtonProps;
	items: _project.Item[];
}

export const projects: Projects = {
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
	items: _project.items.filter(x => x.pin),
};



export interface ContactForm extends _contact.Form {
	message?: string;
};

export interface Contacts {
	heading: string;
	message: string;
	iconSize?: LinkButtonProps["size"];
	items: _contact.Item[];
	form?: ContactForm;
}

export const contacts: Contacts = {
	heading: "Get In Touch",
	message: "제가 해야 할 일이 있나요? 언제든지 편하게 말씀해 주세요!",
	iconSize: "lg",
	items: _contact.items,
	form: {
		..._contact.form,
		message: "지금 바로 메일을 보낼 수도 있어요!",
	},
};
