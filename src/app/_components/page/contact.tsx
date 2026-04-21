import type { MarkdownValue } from "@/lib/utils";

import { LinkButton, type LinkButtonProps } from "@/components/link-button";
import { Heading } from "@/components/heading";
import { Message } from "@/components/message";
import { Fade } from "@/components/fade";

import { Section, type SectionProps } from "./section";



export interface HomeContactData {
	heading: string;
	message: MarkdownValue;
	iconSize?: LinkButtonProps["size"];
	items: LinkButtonProps[];
}


export interface ContactProps extends Omit<SectionProps, "children">, HomeContactData {
}

export function Contact({
	heading,
	message,
	items,
	iconSize,
	...props
}: ContactProps) {
	return (
		<Section {...props}>
			<Fade className="space-y-4 text-center">
				<Heading
					level={2}
					children={heading}
				/>
				<Message
					source={message}
				/>
			</Fade>
			<Fade
				className="flex flex-wrap items-center justify-center gap-4"
				children={items.map(button => (
					<LinkButton key={button.href} size={iconSize} {...button}/>
				))}
			/>
		</Section>
	);
}
