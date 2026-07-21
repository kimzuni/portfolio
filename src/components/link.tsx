import Base from "next/link";



export interface LinkProps extends React.ComponentProps<typeof Base> {
	href: string;
}

export function Link({
	href,
	...props
}: LinkProps) {
	const isExternal = href.startsWith("http://") || href.startsWith("https://") || href.startsWith("://");
	const extraProps: Partial<LinkProps> = {
		target: !isExternal ? undefined : "_blank",
		rel: !isExternal ? undefined : "noopener noreferrer",
	};

	return (
		<Base
			href={href}
			{...extraProps}
			{...props}
		/>
	);
}
