export type SectionProps = React.ComponentPropsWithoutRef<"section">;

export default function Section({
	className="",
	...props
}: SectionProps) {
	return (
		<section
			className={`${className} my-8 md:my-16`.trim()}
			{...props}
		/>
	);
};
