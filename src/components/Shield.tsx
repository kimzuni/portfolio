import Img, { ImgProps } from "./Img";
import Link from "./Link";



export type BadgeService = keyof Badge;

export interface Badge {
	badge:
		| `${string}-${string}`
	;
	github:
		| "stars"
		| "forks"
		| "watchers"
		| "createdAt"
		| "lastCommit"
		| "tag"
		| "release"
		| "workflow"
		| "codeSize"
		| "repoSize"
		| "license"
	;
	docker:
		| "automated"
		| "cloud/automated"
		| "cloud/build"
		| "pulls"
		| "stars"
		| "imageSize"
		| "imageVersion"
	;
}

const badgeOptionList = [
	"style",
	"logo",
	"logoColor",
	"logoSize",
	"label",
	"labelColor",
	"color",
	"cacheSeconds",
] as const;

export type BadgeOption = typeof badgeOptionList[number];

export type BadgeOptions = {
	[key in BadgeOption]?:
	key extends "style" ? "flat" | "flat-square" | "plastic" | "for-the-badge" | "social" :
	string;
};



const urls = {
	"github": "https://github.com",
	"docker": "https://hub.docker.com/r",
};

export type BadgeLinkProps<S extends BadgeService> = S extends "badge" ? { link?: string } : { link?: string | boolean };

export interface CustomBadgeProps extends BadgeOptions, BadgeLinkProps<"badge"> {
	service: "badge";
	badge: Badge["badge"];
}

export type BadgeProps<S extends "github" | "docker"> = BadgeOptions & BadgeLinkProps<S> & {
	service: S;
	badge: Exclude<Badge[S], "workflow" | "imageSize" | "imageVersion">,
	user: string;
	repo: string;
}

export interface WorkflowBadgeProps extends Omit<BadgeProps<"github">, "badge"> {
	badge: "workflow";
	workflow: string;
	provider?: "github" | "shield"
}

export interface TagBadgeProps extends Omit<BadgeProps<"docker">, "badge"> {
	badge: "imageSize" | "imageVersion";
	tag: string;
}

export type ShieldProps =
	| CustomBadgeProps
	| BadgeProps<"github">
	| BadgeProps<"docker">
	| WorkflowBadgeProps
	| TagBadgeProps
;



export default function Shield({
	loading="eager",
	...props
}: {
	loading?: ImgProps["loading"];
} & ShieldProps) {
	const path =
		props.service === "badge"
		? `/${props.badge}` :
		props.badge === "workflow" && props.provider === "github"
		? `https://github.com/${props.user}/${props.repo}/actions/workflows/${props.workflow}/badge.svg`
		: `
			${
				["release", "tag", "imageVersion"].includes(props.badge) ? "/v" :
				props.badge === "workflow" ? "/actions" :
				props.badge === "codeSize" ? "/languages" :
				""
			}
			${
				["imageVersion"].includes(props.badge) ? "" :
				`/${props.badge.replace(/([A-Z])/g, "-$1").toLowerCase()}`
			}
			${
				["workflow"].includes(props.badge) ? "/status" :
				""
			}
			/${props.user}/${props.repo}
			${props.badge === "imageSize" || props.badge === "imageVersion" ? `/${props.tag}` : ""}
			${props.badge === "workflow" ? `/${props.workflow}` : ""}
		`.replace(/\s+/g, "").trim()
	;

	const query = badgeOptionList
		.filter(key => props[key])
		.map(key => `${key}=${props[key]}`)
		.join("&")
	;

	const img = <Img
		loading={loading}
		alt={`shields.io badge`}
		aria-label={`${props.service !== "badge" ? props.service : "custom"} badge - ${props.badge}`}
		src={path.startsWith("http") ? path : `https://img.shields.io/${props.service}${path}${query ? `?${query}` : ""}`}
	/>;

	return (<>
		{!props.link ? img : <Link
			className="transition-[filter] drop-shadow-md drop-shadow-transparent hover:drop-shadow-theme-primary"
			to={props.service === "badge" ? props.link : props.link !== true ? props.link : `${urls[props.service]}/${props.user}/${props.repo}`}
			children={img}
		/>}
	</>);
}
