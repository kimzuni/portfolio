import { Section, SectionProps } from "../../components";



export type ProjectsProps = SectionProps;

export default function Projects({
	...props
}: ProjectsProps) {
	return (
		<Section {...props}>
			<Section.Animation>
				<div>
					home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
					home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
				</div>
			</Section.Animation>
		</Section>
	);
}
