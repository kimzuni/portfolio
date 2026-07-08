import { LinkButton } from "@/components/link-button";
import { Heading } from "@/components/heading";

import { Section, type SectionProps } from "./section";
import { Message } from "./message";

import type * as contents from "@/contents";



export interface ContactProps extends Omit<SectionProps, "children">, contents.home.Contacts {
}

export function Contact({
	heading,
	message,
	iconSize,
	items,
	...props
}: ContactProps) {
	return (
		<Section {...props}>
			<div className="space-y-4 text-center">
				<Heading level={2}>
					{heading}
				</Heading>
				<Message>
					{message}
				</Message>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-4">
				{items.map(button => (
					<LinkButton
						key={button.href}
						size={iconSize}
						{...button}
					/>
				))}
			</div>
		</Section>
	);
}
