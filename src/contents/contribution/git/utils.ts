import type * as provider from "./provider";



export function getHostname(slug: provider.Slug) {
	let hostname: string;
	switch (slug) {
		case "bitbucket":
			hostname = "bitbucket.org";
			break;
		case "gitlab":
			hostname = "gitlab.com";
			break;
		default:
			hostname = "github.com";
	}
	return hostname;
}



export function getUrl(
	slug: provider.Slug,
) {
	const hostname = getHostname(slug);
	return `https://${hostname}`;
}



export function getOwnerUrl(
	slug: provider.Slug,
	owner: string,
) {
	const url = getUrl(slug);
	return `${url}/${owner}`;
}



export function getRepoUrl(
	slug: provider.Slug,
	owner: string,
	repo: string,
) {
	const url = getUrl(slug);
	return `${url}/${owner}/${repo}`;
}



export function getNumberUrl(
	slug: provider.Slug,
	owner: string,
	repo: string,
	type: "pr" | "issue",
	number: number,
): string {
	const url = getUrl(slug);

	let path: string;
	switch (slug) {
		case "bitbucket":
			path = type === "pr" ? "pull-requests" : "issues";
			break;
		case "gitlab":
			path = type === "pr" ? "-/merge_requests" : "-/issues";
			break;
		default:
			path = type === "issue" ? "issues" : "pull";
	}

	return `${url}/${owner}/${repo}/${path}/${number}`;
}
