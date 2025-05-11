import Socials, { SocialItem } from "./Socials";



export interface FooterProps extends React.ComponentPropsWithoutRef<"footer"> {
	socials?: SocialItem[];
}

export default function Footer({
	socials=[],
	role="contentinfo",
	className="",
	children,
	...props
}: FooterProps) {
	return (
		<footer
			role={role}
			className={`${className} flex flex-col items-center`.replace(/\s+/g, " ").trim()}
			{...props}
		>
			<Socials items={socials}/>
			<span className="leading-16 text-sm text-theme-text-dark-sub">{children}</span>
		</footer>
	);
}
