import {
	type LucideProps,
	ArrowDown,
	Check,
	ChevronRight,
	ChevronsDown,
	Moon,
	Sun,
} from "lucide-react";



const lucideIcons = {
	ArrowDown,
	Check,
	ChevronRight,
	ChevronsDown,
	Moon,
	Sun,
};

export type IconName = keyof typeof lucideIcons;
export interface IconProps extends LucideProps {
	icon: IconName;
}

export function Icon({ icon, ...props }: IconProps) {
	const I = lucideIcons[icon];
	return <I {...props}/>;
}
