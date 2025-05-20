import { Link, UList, UListProps, IconName } from "../components";
import { getIcon } from "../utils";



export interface SocialItem {
	icon: IconName;
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
			render={({ href, icon }) => <Link className="block p-2 text-xl" to={href} children={getIcon(icon)}/>}
			className={`flex items-center ${className}`.trim()}
			{...props}
		/>
	);
}
