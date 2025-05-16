export type SectionProps = React.ComponentPropsWithoutRef<"section">;

export default function Section({
	className="",
	...props
}: SectionProps) {
	return (
		<section
			className={`${className} mt-8 md:mt-16`.trim()}
			{...props}
		/>
	);
};
