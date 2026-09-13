import { Tooltip } from "@/components/tooltip";



export type Provider = "tandpfun" | "syvixor";

export interface SkillIconOptions {
	provider?: Provider;
	icon?: string;
	label: string;
	level: string;
}

export interface SkillIconProps extends SkillIconOptions, Omit<React.ComponentProps<typeof Tooltip>, "children" | "tooltip"> {
	withTooltip?: boolean;
	perline?: number;
	alt?: string;
	width?: number;
	height?: number;
	className?: string;
}

export function SkillIcon({
	icon,
	label,
	level,
	provider = "syvixor",
	perline = 1,
	width = 48,
	height = 48,
	withTooltip,
	className,
	...props
}: SkillIconProps) {
	const id = `${icon}-skill-tooltip`;

	let src: string;
	if (icon?.includes("/")) {
		src = icon;
	} else {
		const baseURL = provider === "tandpfun" ? "https://skillicons.dev" : "https://skills.syvixor.com/api";
		const slug = icon ?? label.toLowerCase().replace(/[ /.]/, "");
		src = `${baseURL}/icons?perline=${perline}&i=${slug}`;
	}

	const image = (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={src}
			alt={`Skill - ${icon}`}
			aria-describedby={id}
			width={width}
			height={height}
			loading="lazy"
			decoding="async"
		/>
	);

	if (!withTooltip) {
		return image;
	}

	return (
		<Tooltip
			triggerProps={{
				className,
				children: image,
			}}
			{...props}
		>
			<div id={id} className="font-mono text-center">
				<p className="border-b border-primary w-full text-center">{level}</p>
				<p>{label}</p>
			</div>
		</Tooltip>
	);
}
