import type { icons, LucideProps } from "lucide-react";
import * as lucide from "lucide-react";
import type { IconType as SiIconType } from "@icons-pack/react-simple-icons";
import {
	SiGithub as GitHub,
} from "@icons-pack/react-simple-icons";



type _LucideIconName = keyof typeof icons;

export type LucideIconName = _LucideIconName | null;
export interface LucideIconProps extends LucideProps {
	icon: LucideIconName;
}

export function LucideIcon({ icon, ...props }: LucideIconProps) {
	if (icon === null) {
		return null;
	}

	const I = lucide[icon];
	return <I {...props}/>;
}



const simpleIcons = {
	GitHub,
};

export type SimpleIconName = keyof typeof simpleIcons | null;
export interface SimpleIconProps extends React.ComponentProps<SiIconType> {
	icon: SimpleIconName;
}

export function SimpleIcon({ icon, ...props }: SimpleIconProps) {
	if (icon === null) {
		return null;
	}

	const I = simpleIcons[icon];
	return <I {...props}/>;
}



export type IconName = LucideIconName | SimpleIconName;
export type IconProps<N extends IconName = IconName> =
	& { icon: N }
	& (
		N extends LucideIconName
			? LucideProps
			: React.ComponentProps<SiIconType>
	);

export function Icon<N extends IconName>({
	icon,
	...props
}: IconProps<N>) {
	if (icon === null) {
		return null;
	}

	const I = icon in simpleIcons ? SimpleIcon : LucideIcon;

	// @ts-expect-error: ts(2322)
	return <I icon={icon} {...props}/>;
}
