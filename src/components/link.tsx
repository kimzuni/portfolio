import Base from "next/link";



export interface LinkProps extends React.ComponentProps<typeof Base> {
	href: string;
}

export function Link({
	href,
	...props
}: LinkProps) {
	const externalProps: Partial<LinkProps> = {
		target: "_blank",
		rel: "noopener noreferrer",
	};

	return (
		<Base
			href={href}
			{...(
				href.startsWith("http://") || href.startsWith("https://") || href.startsWith("://")
					? externalProps
					: {}
			)}
			{...props}
		/>
	);
}
