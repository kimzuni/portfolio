import { headers } from "next/headers";

import * as seo from "@/lib/seo";

import { Icon } from "@/components/icon";
import { Time } from "@/components/time";
import { LinkBadge } from "@/components/link-badge";

import { Hero } from "./_components/page/hero";
import { About } from "./_components/page/about";
import { Skills } from "./_components/page/skills";
import { Projects } from "./_components/page/projects";
import { Contributions } from "./_components/page/contributions";
import { Contact } from "./_components/page/contact";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.home.metadata);



const LOCALHOST_REGEX = /^(localhost|127\.\d+\.\d+\.\d+)(:\d+)?$/;

export default async function Home() {
	const { app, home } = contents;

	const header = await headers();
	const host = header.get("host");

	const isLatest = app.item.mode === "production" && app.item.url.host === host;
	const isLocalhost = LOCALHOST_REGEX.test(host ?? "");

	return (
		<>
			<Hero
				id="hero"
				className="relative -top-(--header-height) min-h-[calc(100svh-var(--header-height))]"
				{...home.hero}
			>
				<p className="flex flex-col gap-1 items-center-safe text-sm text-muted-foreground">
					<span>
						{isLatest ? "Last Updated" : "Release Date"}
						: <Time value={app.item.releaseDate}/>
					</span>
					{app.item.mode !== "production" && (
						<span>({app.item.mode} mode)</span>
					)}
					{!isLatest && (
						<LinkBadge
							variant="link"
							icon="ExternalLink"
							href={app.item.url.href}
							label="최신 릴리즈 버전 보러 가기"
							className="text-sm"
							iconPosition="right"
						/>
					)}
				</p>
				<div className="mx-auto w-fit text-muted-foreground">
					<Icon icon="ChevronsDown" className="animate-bounce"/>
				</div>
			</Hero>

			<About
				id="about"
				{...home.about}
			/>

			<Skills
				id="skills"
				{...home.skills}
			/>

			<Projects
				id="projects"
				{...home.projects}
			/>

			<Contributions
				id="contributions"
				{...home.contributions}
			/>

			<Contact
				id="contact"
				isLatest={isLatest}
				isLocalhost={isLocalhost}
				{...home.contacts}
			/>
		</>
	);
}
