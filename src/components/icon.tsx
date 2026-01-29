import {
	type LucideProps,
	ArrowDown,
	ArrowRight,
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
	Moon,
	RefreshCcw,
	Server,
	Sun,
	Wrench,
} from "lucide-react";



const lucideIcons = {
	ArrowDown,
	ArrowRight,
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
	Moon,
	RefreshCcw,
	Server,
	Sun,
	Wrench,
};

export type IconName = keyof typeof lucideIcons;
export interface IconProps extends LucideProps {
	icon: IconName;
}

export function Icon({ icon, ...props }: IconProps) {
	const I = lucideIcons[icon];
	return <I {...props}/>;
}
