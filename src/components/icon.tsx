import {
	type LucideProps,
	ArrowDown,
	ArrowRight,
	ArrowRightCircle,
	ChartBar,
	Check,
	ChevronRight,
	ChevronsDown,
	Circle,
	Cloud,
	Code2,
	Database,
	Layout,
	LinkIcon,
	Mail,
	Moon,
	RefreshCcw,
	RotateCcw,
	Server,
	Sun,
	Wrench,
} from "lucide-react";
import {
	type IconType as SiIconType,
	SiGithub as GitHub,
} from "@icons-pack/react-simple-icons";



const lucideIcons = {
	ArrowDown,
	ArrowRight,
	ArrowRightCircle,
	ChartBar,
	Check,
	ChevronRight,
	ChevronsDown,
	Circle,
	Cloud,
	Code2,
	Database,
	Layout,
	LinkIcon,
	Mail,
	Moon,
	RefreshCcw,
	RotateCcw,
	Server,
	Sun,
	Wrench,
};

export type LucideIconName = keyof typeof lucideIcons;
export interface LucideIconProps extends LucideProps {
	icon: LucideIconName;
}

export function LucideIcon({ icon, ...props }: LucideIconProps) {
	const I = lucideIcons[icon];
	return <I {...props}/>;
}



const simpleIcons = {
	GitHub,
};

export type SimpleIconName = keyof typeof simpleIcons;
export interface SimpleIconProps extends React.ComponentProps<SiIconType> {
	icon: SimpleIconName;
}

export function SimpleIcon({ icon, ...props }: SimpleIconProps) {
	const I = simpleIcons[icon];
	return <I {...props}/>;
}



export type IconProps = LucideIconProps | SimpleIconProps;
export type IconName = IconProps["icon"];

export function Icon({
	icon,
	...props
}: IconProps) {
	const I = icon in lucideIcons ? LucideIcon : SimpleIcon;

	// @ts-expect-error: ts(2322)
	return <I icon={icon} {...props}/>;
}
