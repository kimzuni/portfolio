import { cn } from "@/lib/utils";

import { LinkButton } from "@/components/link-button";
import { Heading } from "@/components/heading";
import { Carousel, CarouselItem } from "@/components/carousel";
import { ContributionBox } from "@/components/contribution-box";

import { Section, type SectionProps } from "./section";
import { Message } from "./message";

import type * as contents from "@/contents";



export interface ContributionCarouselProps {
	items: contents.contribution.Item[];
	fallback?: React.ReactNode;
}

export function ContributionCarousel({
	items,
	fallback,
}: ContributionCarouselProps) {
	if (!items.length) {
		return fallback ?? null;
	}

	return (
		<Carousel>
			{items.map((item, idx) => (
				<CarouselItem key={idx} className="basis-full md:basis-1/3 flex">
					<ContributionBox
						className="select-none h-full"
						url={item.repository.url}
						provider={item.provider.label}
						owner={item.owner.slug}
						repository={item.repository.slug}
						scope={item.repository.scope}
						date={item.date}
						status={{
							label: item.status.label,
							icon: item.status.icon,
							color: item.status.color,
						}}
						numbers={item.numbers.map(n => ({
							value: n.value,
							colors: n.labels.map(l => l.color),
							type: n.type,
							status: n.status,
							url: n.url,
						}))}
						skills={item.skills.primary.map(s => ({
							slug: s.slug,
							label: s.label,
						}))}
						description={item.description.result}
					/>
				</CarouselItem>
			))}
		</Carousel>
	);
}



export interface ContributionsProps extends Omit<SectionProps, "children">, contents.home.Contributions {
}

export function Contributions({
	heading,
	message,
	linkButton,
	items,
	className,
	...props
}: ContributionsProps) {
	return (
		<Section className={cn("@container", className)} {...props}>
			<div className="space-y-6">
				<div className="flex items-center justify-between gap-2">
					<Heading level={2}>
						{heading}
					</Heading>
					<LinkButton
						href="/contributions/"
						{...linkButton}
					/>
				</div>

				<Message>
					{message}
				</Message>
			</div>

			<ContributionCarousel
				items={items}
			/>
		</Section>
	);
}
