import { headers } from "next/headers";

import * as seo from "@/lib/seo";

import { Icon } from "@/components/icon";
import { Time } from "@/components/time";
import { LinkBadge } from "@/components/link-badge";

import { Hero } from "./_components/page/hero";
import { About } from "./_components/page/about";
import { Skills } from "./_components/page/skills";
import { Projects } from "./_components/page/projects";
import { Contact } from "./_components/page/contact";

import * as contents from "@/contents";



export const metadata = seo.createMetadata(contents.home.metadata);



export default async function Home() {
	const header = await headers();
	const host = header.get("host");

	const { app, home } = contents;

	const isLatest = app.item.mode === "production" && app.item.url.host === host;

	return (
		<>
			<Hero
				id="hero"
				className="page-content min-h-[calc(100svh-var(--header-height))]"
				{...home.hero}
			>
				<p className="flex flex-col gap-1 items-center-safe text-sm text-muted-foreground">
					<span>
						{isLatest ? "Last Updated" : "Build Time"}
						: <Time date={app.item.buildTime}/>
					</span>
					{app.item.mode !== "production" && (
						<span>({app.item.mode} mode)</span>
					)}
					{!isLatest && (
						<span>
							{
								app.item.mode !== "production"
									? ""
									: ""
							}
							<LinkBadge
								variant="link"
								icon="ExternalLink"
								href={app.item.url.href}
								label="정식 릴리즈 버전 보러 가기"
								className="text-sm"
							/>
						</span>
					)}
				</p>
				<div className="mx-auto w-fit text-muted-foreground">
					<Icon icon="ChevronsDown" className="animate-bounce"/>
				</div>
			</Hero>

			<About
				id="about"
				className="page-content"
				{...home.about}
			/>

			<Skills
				id="skills"
				className="page-content"
				{...home.skills}
			/>

			<Projects
				id="projects"
				className="page-content"
				{...home.projects}
			/>

			<Contact
				id="contact"
				className="page-content"
				{...home.contacts}
			/>
		</>
	);
}
