import Img from "./Img";
import Link from "./Link";



export type Service = keyof Badge;

export interface Badge {
	github: 
		| "stars"
		| "forks"
		| "watchers"
		| "createdAt"
		| "lastCommit"
		| "tag"
		| "release"
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

export interface BadgeOptional {
	style?: "flat" | "flat-square" | "plastic" | "for-the-badge" | "social";
	logo?: string;
	logoColor?: string;
	logoSize?: string;
	label?: string;
	labelColor?: string;
	color?: string;
	cacheSeconds?: string;
};

export interface ShieldProps<S extends Service> {
	service: S;
	badge: Badge[S];
	user: string;
	repo: string;
	tag?: string;
	link?: string;
	options?: BadgeOptional;
}

export default function Shield<S extends Service>({
	service,
	badge,
	user,
	repo,
	tag,
	link,
	options={},
}: ShieldProps<S>) {
	const path = `
		${
			["release", "tag", "imageVersion"].includes(badge) ? "/v" :
			badge === "codeSize" ? "/languages" :
			""
		}
		${
			["imageVersion"].includes(badge) ? "" :
			`/${badge.replace(/([A-Z])/g, "-$1").toLowerCase()}`
		}
		/${user}/${repo}
		${
			["imageSize", "imageVersion"].includes(badge) && tag ? `/${tag}` :
			""
		}
	`.replace(/\s+/g, "").trim();

	const query = Object.entries(options)
		.filter(([key, val]) => key && val)
		.map(x => x.join("="))
		.join("&")
	;

	const img = <Img
		alt={`${service} repo ${badge}`}
		src={`https://img.shields.io/${service}${path}${query ? `?${query}` : ""}`}
	/>;

	return (<>
		{!link ? img : <Link to={link} children={img}/>}
	</>);
}
