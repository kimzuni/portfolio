import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";



const icons = [
	{
		icon: "github",
		svg: <FaGithub/>,
	},
	{
		icon: "instagram",
		svg: <FaInstagram/>,
	},
] as const;

export type IconType = (typeof icons[number])["icon"];

export const getIcon = (icon: IconType) => {
	return icons.find(x => x.icon === icon)!.svg;
};

export default icons;
