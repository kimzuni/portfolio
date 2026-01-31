import { LinkButton, type LinkButtonProps } from "@/components/link-button";
import { Fade } from "@/components/fade";

import { Section, type SectionProps } from "./section";



export interface HomeContactData {
	heading: string;
	message: string;
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
				<h2
					className="title"
					children={heading}
				/>
				<p
					className="empty:hidden message"
					children={message}
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
