import { cookies } from "next/headers";

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

const AUTO_CHECK_KEY = "contact_form_auto_check";

export async function Contact({
	heading,
	message,
	iconSize,
	items,
	form,
	isLatest,
	isLocalhost,
	...props
}: ContactProps) {
	const cookieStore = await cookies();
	const autoCheck = cookieStore.get(AUTO_CHECK_KEY)?.value !== "false";

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
					checkInterval={form.checkInterval}
					ulist={form.ulist}
					className="mx-auto max-w-2xl w-full"
					autoCheck={autoCheck}
					autoCheckKey={AUTO_CHECK_KEY}
				/>
			)}
		</Section>
	);
}
