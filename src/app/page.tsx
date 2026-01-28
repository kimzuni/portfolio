import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";

import * as contents from "@/contents/home";

import { Hero } from "./_components/page/hero";



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
				<div className="mx-auto w-fit text-muted-foreground">
					<Icon icon="ChevronsDown" className="animate-bounce"/>
				</div>
			</Hero>

			<section id="about">About</section>
		</>
	);
}
