import { Link as Base, LinkProps } from "react-router";



export type { LinkProps };

export default function Link({
	to,
	...props
}: LinkProps) {
	const isBlank = typeof to === "string" && to.startsWith("http");

	return (
		<Base
			to={to}
			target={isBlank ? "_blank" : undefined}
			rel={isBlank ? "noopener noreferrer" : undefined}
			aria-label={!isBlank ? undefined : "open in a new tab"}
			{...props}
		/>
	);
}
