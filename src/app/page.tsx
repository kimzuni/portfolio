import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";
import { Time } from "@/components/time";

import * as contents from "@/contents/home";

import { Hero } from "./_components/page/hero";
import { About } from "./_components/page/about";
import { Skills } from "./_components/page/skills";
import { Projects } from "./_components/page/projects";
import { Contact } from "./_components/page/contact";



const NODE_ENV = process.env.NODE_ENV;
const IS_LOCAL = !process.env.GITHUB_WORKFLOW && !process.env.GITHUB_ACTION;
const buildDate = new Date();

export default function Home() {
	return (
		<>
			<div
				id="hero-background"
				className={cn(
					"absolute inset-0 -top-(--header-height) h-svh -z-1",
					"from-primary/15 dark:from-primary/10 via-transparent to-transparent",
					"bg-linear-to-b dark:bg-linear-to-br",
				)}
			/>
			<Hero
				id="hero"
				className="container min-h-[calc(100svh-var(--header-height))]"
				{...contents.hero}
			>
				<p className="flex flex-wrap gap-1 justify-center-safe text-sm text-muted-foreground">
					<span>Last updated:</span>
					{
						NODE_ENV === "production"
							? <Time date={buildDate}/>
							: <span>{NODE_ENV} mode</span>
					}
					{NODE_ENV === "production" && IS_LOCAL && (
						<span>(local build)</span>
					)}
				</p>
				<div className="mx-auto w-fit text-muted-foreground">
					<Icon icon="ChevronsDown" className="animate-bounce"/>
				</div>
			</Hero>

			<About
				id="about"
				className="container"
				{...contents.about}
			/>

			<Skills
				id="skills"
				className="container"
				{...contents.skills}
			/>

			<Projects
				id="projects"
				className="container"
				{...contents.projects}
			/>

			<Contact
				id="contact"
				className="container"
				{...contents.contact}
			/>
		</>
	);
}
