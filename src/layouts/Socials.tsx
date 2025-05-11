import { UList, UListProps } from "../components";
import { getIcon, IconType } from "./icons";



export interface SocialItem {
	icon: IconType;
	href: string;
}

export interface SocialsProps extends Omit<UListProps<SocialItem>, "items" | "render"> {
	items?: SocialItem[];
};

export default function Socials({
	items=[],
	className="",
	...props
}: SocialsProps) {
	return (
		<UList
			items={items}
			render={({ href, icon }) => <a className="block p-2 text-xl" href={href} target="_blank" rel="noopener noreferrer">{getIcon(icon)}</a>}
			className={`flex items-center ${className}`.trim()}
			{...props}
		/>
	);
}
