import { ScrollFade } from "../../components";

import Section, { SectionProps } from "./Section";



export type ProjectsProps = SectionProps;

export default function Projects({
	...props
}: ProjectsProps) {
	return (
		<Section {...props}>
			<ScrollFade>
				<div>
					home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
					home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
				</div>
			</ScrollFade>
		</Section>
	);
}
