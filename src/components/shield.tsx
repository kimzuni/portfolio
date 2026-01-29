import { cn } from "@/lib/utils";

import { Icon } from "./icon";
import { Link } from "./link";



const urls = {
	github: "https://github.com",
	gitlab: "https://gitlab.com",
	bitbucket: "https://bitbucket.org",
	docker: "https://hub.docker.com/r",
	npm: "https://www.npmjs.com",
	codecov: "https://app.codecov.io",
	coveralls: "https://coveralls.io",
};



export type BadgeService = keyof Badge;

export interface Badge {
	static:
		| `${string}-${string}`;

	github:
		| "stars"
		| "forks"
		| "watchers"
		| "created-at"
		| "last-commit"
		| "tag"
		| "release"
		| "workflow"
		| "code-size"
		| "repo-size"
		| "license";

	docker:
		| "automated"
		| "cloud/automated"
		| "cloud/build"
		| "pulls"
		| "stars"
		| "image-size"
		| "image-version";

	npm:
		| "collaborators"
		| "last-update"
		| "downloads"
		| "license"
		| "unpacked-size"
		| "version";

	coverage:
		| "coveralls"
		| "codecov";
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
	[key in BadgeOption]?: key extends "style"
		? "flat" | "flat-square" | "plastic" | "for-the-badge" | "social"
		: string;
};



export interface CommonBadgeProps<
	S extends BadgeService,
	K extends Badge[S] = Badge[S],
> extends BadgeOptions {
	service: S;
	badge: Extract<Badge[S], K>;
}



export interface StaticBadgeProps extends CommonBadgeProps<"static"> {
	link?: string;
}


export interface CommonGitHubBadgeProps<
	K extends Badge["github"] = Badge["github"],
> extends CommonBadgeProps<"github", K> {
	link?: string | boolean;
	user: string;
	repo: string;
}

export interface GitHubBadgeProps extends CommonGitHubBadgeProps<Exclude<Badge["github"], "workflow">> {
}

export interface GitHubWorkflowBadgeProps extends CommonGitHubBadgeProps<"workflow"> {
	workflow: string;
	provider?: "github" | "shield";
}



export interface CommonDockerBadgeProps<
	K extends Badge["docker"] = Badge["docker"],
> extends CommonBadgeProps<"docker", K> {
	link?: string | boolean;
	user: string;
	repo: string;
}

export interface DockerBadgeProps extends CommonDockerBadgeProps<Exclude<Badge["docker"], "image-size" | "image-version">> {
}

export interface DockerTagBadgeProps extends CommonDockerBadgeProps<"image-size" | "image-version"> {
	tag?: string;
}



export interface CommonNPMBadgeProps<
	K extends Badge["npm"] = Badge["npm"],
> extends CommonBadgeProps<"npm", K> {
	link?: string | boolean;
	packageName: string;
}

export interface NPMBadgeProps extends CommonNPMBadgeProps<Exclude<Badge["npm"], "last-update" | "downloads" | "unpacked-size" | "version">> {
}

export interface NPMMaybeTagBadgeProps extends CommonNPMBadgeProps<"last-update" | "version"> {
	tag?: string;
}

export interface NPMDownloadsBadgeProps extends CommonNPMBadgeProps<"downloads"> {
	interval: "dw" | "dm" | "dy" | "d18m";
}

export interface NPMDownloadsByAuthorBadgeProps extends Omit<NPMDownloadsBadgeProps, "packageName"> {
	author: string;
}

export interface NPMSizeBadgeProps extends CommonNPMBadgeProps<"unpacked-size"> {
	version?: string;
}



export interface CommonCoverageBadgeProps<
	K extends Badge["coverage"] = Badge["coverage"],
> extends CommonBadgeProps<"coverage", K> {
	link?: string | boolean;
	vcs: "github" | "gitlab" | "bitbucket";
	user: string;
	repo: string;
}

export interface CoverallsBadgeProps extends CommonCoverageBadgeProps<"coveralls"> {
}

export interface CodecovBadgeProps extends CommonCoverageBadgeProps<"codecov"> {
	branch?: string;
}



export type ShieldProps =
	| StaticBadgeProps
	| GitHubBadgeProps
	| GitHubWorkflowBadgeProps
	| DockerBadgeProps
	| DockerTagBadgeProps
	| NPMBadgeProps
	| NPMMaybeTagBadgeProps
	| NPMDownloadsBadgeProps
	| NPMDownloadsByAuthorBadgeProps
	| NPMSizeBadgeProps
	| CoverallsBadgeProps
	| CodecovBadgeProps;



export function Shield({
	style = "flat",
	...props
}: ShieldProps) {
	let link;
	if (typeof props.link === "string") {
		link = props.link;
	} else if (props.link && props.service !== "static") {
		if (props.service === "github" || props.service === "docker") {
			link = `${urls[props.service]}/${props.user}/${props.repo}`;
		} else if (props.service === "npm") {
			if ("author" in props) {
				link = `${urls.npm}/~${props.author}`;
			} else {
				link = `${urls.npm}/package/${props.packageName}`;
			}
		} else if (props.service === "coverage") {
			link = `${urls[props.badge]}/${props.vcs}/${props.user}/${props.repo}`;
		}
	}

	let src = `https://img.shields.io/${props.service}`;
	if (props.service === "static") {
		src = `/badge/${props.badge}`;
	} else if (props.badge === "workflow" && props.provider === "github") {
		src = `https://github.com/${props.user}/${props.repo}/actions/workflows/${props.workflow}/badge.svg`;
	} else if (props.service === "github" || props.service === "docker") {
		if (["release", "tag", "imageVersion"].includes(props.badge)) {
			src += "/v";
		} else if (props.badge === "workflow") {
			src += "/actions";
		} else if (props.badge === "code-size") {
			src += "/languages";
		}

		if (!["imageVersion"].includes(props.badge)) {
			src += `/${props.badge}`;
		}

		if (["workflow"].includes(props.badge)) {
			src += "/status";
		}

		src += `/${props.user}/${props.repo}`;

		if (props.service === "docker" && "tag" in props && props.tag) {
			src += `/${props.tag}`;
		}

		if (props.badge === "workflow") {
			src += `/${props.workflow}`;
		}
	} else if (props.service === "npm") {
		if ("interval" in props) {
			if ("author" in props) {
				src += `-stat/${props.interval}/${props.author}`;
			} else {
				src += `/${props.interval}/${props.packageName}`;
			}
		} else {
			if (props.badge === "license") {
				src += "/l";
			} else if (props.badge === "version") {
				src += "/v";
			} else {
				src += `/${props.badge}`;
			}

			src += `/${props.packageName}`;

			if ("tag" in props) {
				src += `/${props.tag}`;
			}
		}
	} else if (props.service === "coverage") {
		src = "https://img.shields.io";
		if (props.badge === "coveralls") {
			src += "/coverallsCoverage";
		} else if (props.badge === "codecov") {
			src += "/codecov/c";
		}

		src += `/${props.vcs}/${props.user}/${props.repo}`;

		if (props.badge === "codecov" && props.branch) {
			src += `/${props.branch}`;
		}
	}

	let query;
	if (
		!("provider" in props)
		|| (
			props.provider
			&& props.provider === "shield"
		)
	) {
		query = badgeOptionList.filter(x => x !== "style")
			.reduce<string[]>((acc, key) => {
				const value = props[key];
				if (value) acc.push(`${key}=${value}`);
				return acc;
			}, [`style=${style}`])
			.join("&");
	}

	const alt = `${props.service !== "static" ? props.service : "custom"} badge - ${props.badge}`;
	const img = (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			loading="lazy"
			alt={alt}
			aria-label={alt}
			src={`${src}${query ? `?${query}` : ""}`}
			className={cn(
				"h-[20px]",
				props.link ? "object-cover transition-[filter] drop-shadow-md drop-shadow-transparent group-hover:drop-shadow-theme-primary" : "object-cover",
			)}
		/>
	);

	return (
		!link
			? img
			: (
				<Link
					className="inline-flex items-center gap-0.5 hover:text-primary transition-colors"
					href={link}
					children={<>
						<Icon icon="LinkIcon" size={12}/>
						{img}
					</>}
				/>
			)
	);
}
