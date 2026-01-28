import {
	type LucideProps,
	ArrowDown,
	ArrowRight,
	Check,
	ChevronRight,
	ChevronsDown,
	Circle,
	Cloud,
	Code2,
	Database,
	Layout,
	Moon,
	Server,
	Sun,
	Wrench,
} from "lucide-react";



const lucideIcons = {
	ArrowDown,
	ArrowRight,
	Check,
	ChevronRight,
	ChevronsDown,
	Circle,
	Cloud,
	Code2,
	Database,
	Layout,
	Moon,
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
