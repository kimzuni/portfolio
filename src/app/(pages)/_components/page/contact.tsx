import { LinkButton } from "@/components/link-button";
import { Heading } from "@/components/heading";

import { Section, type SectionProps } from "./section";
import { Message } from "./message";
import { ContactForm } from "./contact-form";

import type * as contents from "@/contents";



export interface ContactProps extends Omit<SectionProps, "children">, contents.home.Contacts {
	isLatest: boolean;
	isLocalhost: boolean;
}

export function Contact({
	heading,
	message,
	iconSize,
	items,
	form,
	isLatest,
	isLocalhost,
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
			{form?.enable && (
				<ContactForm
					url={form.server.href}
					to={form.to}
					message={form.message}
					isActive={isLocalhost || isLatest}
					className="mx-auto max-w-2xl w-full"
				/>
			)}
		</Section>
	);
}
