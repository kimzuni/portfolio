import Base from "next/link";



export interface LinkProps extends React.ComponentProps<typeof Base> {
	href: string;
}

export function Link({
	href,
	...props
}: LinkProps) {
	return (
		href.startsWith("http://") || href.startsWith("https://") || href.startsWith("://")
			? <Base href={href} target="_blank" rel="noopener noreferrer" {...props}/>
			: <Base href={href} {...props}/>
	);
}
