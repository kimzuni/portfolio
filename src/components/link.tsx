import Base from "next/link";



export interface LinkOptions {
	href: string;
}

export interface LinkProps extends React.ComponentProps<typeof Base>, LinkOptions {
	href: string;
}

export function Link({
	href,
	target: _target,
	...props
}: LinkProps) {
	const isExternal = href.startsWith("//") || href.includes("://");
	const target: React.HTMLAttributeAnchorTarget | undefined = _target ?? (!isExternal ? undefined : "_blank");
	const rel = target === "_blank" ? "noopener noreferrer" : undefined;

	return (
		<Base
			href={href}
			target={target}
			rel={rel}
			{...props}
		/>
	);
}
