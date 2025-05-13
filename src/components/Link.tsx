import { Link as Base, LinkProps } from "react-router";



export type { LinkProps };

export default function Link({
	to,
	target,
	rel,
	...props
}: LinkProps) {
	const isBlank = typeof to === "string" && to.startsWith("http");

	return (
		<Base
			to={to}
			target={target ?? (isBlank ? "_blank" : undefined)}
			rel={rel ?? (isBlank ? "noopener noreferrer" : undefined)}
			{...props}
		/>
	);
}