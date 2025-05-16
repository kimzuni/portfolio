export type SectionProps = React.ComponentPropsWithoutRef<"section">;

export default function Section({
	className="",
	...props
}: SectionProps) {
	return (
		<section
			className={`${className} pb-48 md:pb-64`.trim()}
			{...props}
		/>
	);
};
