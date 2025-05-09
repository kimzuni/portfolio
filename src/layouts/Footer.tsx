export type FooterProps = React.ComponentPropsWithoutRef<"footer">;



export default function Footer({
	role="contentinfo",
	className="",
	...props
}: FooterProps) {
	return (
		<footer
			role={role}
			className={`
				h-16 leading-16
				text-theme-text-dark-sub text-center
				${className}
			`.replace(/\s+/g, " ").trim()}
			{...props}
		/>
	);
}
