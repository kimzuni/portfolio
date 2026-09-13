import { cn } from "@/lib/utils";

import { Icon } from "@/components/icon";
import { Link } from "@/components/link";



const urls = {
	shieldsio: "https://img.shields.io",

	github: "https://github.com",
	gitlab: "https://gitlab.com",
	bitbucket: "https://bitbucket.org",
	docker: "https://hub.docker.com/r",
	npm: "https://www.npmjs.com",
	codecov: "https://app.codecov.io",
	coveralls: "https://coveralls.io",
	bundlephobia: "https://bundlephobia.com/package",
	bundlejs: "https://bundlejs.com/?q=",
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
		| "bundlephobia"
		| "bundlejs"
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



export interface LinkOptions {
	link?: string | boolean;
	linkSuffix?: string;
}

export interface UserRepoOptions {
	user: string;
	repo: string;
}



export interface StaticBadgeProps extends CommonBadgeProps<"static">, LinkOptions {
	link?: string;
}



export interface CommonGitHubBadgeProps<
	K extends Badge["github"] = Badge["github"],
> extends CommonBadgeProps<"github", K>, LinkOptions, UserRepoOptions {
}

export interface GitHubBadgeProps extends CommonGitHubBadgeProps<Exclude<Badge["github"], "workflow">> {
}

export interface GitHubWorkflowBadgeProps extends CommonGitHubBadgeProps<"workflow"> {
	workflow: string;
	provider?: "github" | "shield";
}



export interface CommonDockerBadgeProps<
	K extends Badge["docker"] = Badge["docker"],
> extends CommonBadgeProps<"docker", K>, LinkOptions, UserRepoOptions {
}

export interface DockerBadgeProps extends CommonDockerBadgeProps<Exclude<Badge["docker"], "image-size" | "image-version">> {
}

export interface DockerTagBadgeProps extends CommonDockerBadgeProps<"image-size" | "image-version"> {
	tag?: string;
}



export interface CommonNPMBadgeProps<
	K extends Badge["npm"] = Badge["npm"],
> extends CommonBadgeProps<"npm", K>, LinkOptions {
	packageName: string;
}

export interface NPMBadgeProps extends CommonNPMBadgeProps<Exclude<Badge["npm"], "last-update" | "downloads" | "unpacked-size" | "bundlephobia" | "version">> {
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

export interface NPMBundlephobiaBadgeProps extends CommonNPMBadgeProps<"bundlephobia"> {
	format?: "minzip" | "gzip";
	version?: string;
}

export interface NPMUnpackedSizeBadgeProps extends CommonNPMBadgeProps<"unpacked-size"> {
	version?: string;
}



export interface CommonCoverageBadgeProps<
	K extends Badge["coverage"] = Badge["coverage"],
> extends CommonBadgeProps<"coverage", K>, LinkOptions, UserRepoOptions {
	vcs: "github" | "gitlab" | "bitbucket";
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
	| NPMBundlephobiaBadgeProps
	| NPMUnpackedSizeBadgeProps
	| CoverallsBadgeProps
	| CodecovBadgeProps;



const getLink = (props: ShieldProps) => {
	if (typeof props.link === "string") return props.link;
	if (props.link !== true || props.service === "static") return;

	let link: string;
	switch (props.service) {
		case "github":
		case "docker":
			link = `${urls[props.service]}/${props.user}/${props.repo}`;
			break;
		case "coverage":
			link = `${urls[props.badge]}/${props.vcs}/${props.user}/${props.repo}`;
			break;
		case "npm":
			if ("author" in props) link = `${urls.npm}/~${props.author}`;
			else if (props.badge === "bundlephobia") link = `${urls.bundlephobia}/${props.packageName}`;
			else if (props.badge === "bundlejs") link = `${urls.bundlejs}${props.packageName}`;
			else link = `${urls.npm}/package/${props.packageName}`;
			break;
	}
	return link + `${props.linkSuffix ?? ""}`;
};

const getSrc = (props: ShieldProps) => {
	let baseUrl = urls.shieldsio;
	let prefix = "";
	const paths: Array<string | undefined> = [];
	switch (props.service) {
		case "static":
			paths.push("badge", props.badge);
			break;
		case "github":
		case "docker":
			prefix = props.service;
			switch (props.badge) {
				case "workflow":
					if (props.provider === "github") {
						baseUrl = urls.github;
						prefix = "";
						paths.push(props.user, props.repo, "actions", "workflows", props.workflow, "badge.svg");
						break;
					}
					paths.push("actions", "workflows", "status", props.user, props.repo, props.workflow);
					break;
				case "tag":
				case "image-version":
					paths.push("v", props.user, props.repo);
					break;
				case "release":
					paths.push("v", "release", props.user, props.repo);
					break;
				case "code-size":
					paths.push("languages", "code-size", props.user, props.repo);
					break;
				default:
					paths.push(props.badge, props.user, props.repo);
					break;
			}

			if ("tag" in props && props.tag) {
				paths.push(props.tag);
			}

			break;
		case "npm":
			prefix = "npm";

			switch (props.badge) {
				case "downloads":
					if ("author" in props) {
						prefix += "-stat";
						paths.push(props.interval, props.author);
					} else {
						paths.push(props.interval, props.packageName);
					}
					break;
				case "license":
					paths.push("l", props.packageName);
					break;
				case "version":
					paths.push("v", props.packageName);
					// break; // last-update와 함께 tag를 사용함
				case "last-update":
					if (props.tag) {
						paths.push(props.tag);
					}
					break;
				case "bundlephobia":
					prefix = "";
					paths.push("bundlephobia", props.format || "minzip", props.packageName);
					break;
				case "bundlejs":
					prefix = "";
					paths.push("bundlejs", "size", props.packageName);
					break;
				default:
					paths.push(props.badge, props.packageName);
					break;
			}

			break;
		case "coverage":
			switch (props.badge) {
				case "coveralls":
					paths.push(`coverallsCoverage`, props.vcs, props.user, props.repo);
					break;
				case "codecov":
					paths.push(
						`codecov`,
						"c",
						props.vcs,
						props.user,
						props.repo,
						props.branch ? props.branch : "",
					);
					break;
			}

			break;
	}

	const src = [
		baseUrl,
		prefix,
		...paths,
	].filter(Boolean).join("/");

	return src;
};

const getQuery = (props: ShieldProps) => {
	const isShieldsio = !("provider" in props) || props.provider === "shield";
	if (!isShieldsio) return;

	const params = new URLSearchParams();
	for (const key of badgeOptionList) {
		const value = props[key];
		if (value) params.set(key, value);
	}

	return params.toString();
};



export function Shield(props: ShieldProps) {
	const link = getLink(props);
	const src = getSrc(props);
	const query = getQuery(props);

	const alt = `${props.service !== "static" ? props.service : "custom"} badge - ${props.badge}`;
	const img = (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			alt={alt}
			aria-label={alt}
			src={`${src}${query ? `?${query}` : ""}`}
			loading="lazy"
			decoding="async"
			className={cn(
				"h-5",
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
				>
					<Icon icon="Link" size={12}/>
					{img}
				</Link>
			)
	);
}
