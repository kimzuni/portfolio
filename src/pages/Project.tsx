export interface ProjectItem {
	title: string;
}



export default function Project({
	title,
}: ProjectItem) {
	return (
		<div>
			Project: {title}
		</div>
	);
}
