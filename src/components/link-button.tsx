import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/link";
import { Icon, type IconName } from "@/components/icon";



export interface LinkButtonProps extends Omit<React.ComponentProps<typeof Button>, "render"> {
	label?: string;
	href?: string;
	icon?: IconName;
	iconPosition?: "left" | "right";
	iconScale?: number;
	iconRotate?: number;
	iconTranslateX?: number;
	iconTranslateY?: number;
}



export function LinkButton({
	label,
	href,
	icon,
	iconPosition = "left",
	iconScale = 1,
	iconRotate = 0,
	iconTranslateX = 0,
	iconTranslateY = 0,
	variant = "default",
	className,
	children: _children,
	...props
}: LinkButtonProps) {
	const children = (
		<>
			{icon && (
				<Icon
					icon={icon}
					className={cn(
						"group-hover/link-button:translate-x-(--tx) group-hover/link-button:translate-y-(--ty) group-hover/link-button:rotate-(--rotate)",
						"group-hover/link-button:scale-(--scale)",
						"transition-transform",
					)}
					style={{
						"--tx": `${iconTranslateX}px`,
						"--ty": `${iconTranslateY}px`,
						"--scale": iconScale,
						"--rotate": `${iconRotate}deg`,
					} as React.CSSProperties}
				/>
			)}
			{label}
			{_children}
		</>
	);

	return (
		<Button
			variant={variant}
			nativeButton={!href}
			className={cn(
				"group/link-button flex items-center",
				iconPosition === "left" ? "flex-row" : "flex-row-reverse",
				variant === "default" ? "rounded-full" : "",
				variant === "outline" ? "hover:text-primary hover:border-primary!" : "",
				className,
			)}
			size={label ? "default" : "icon"}
			render={
				!href
					? <button>{children}</button>
					: <Link href={href}>{children}</Link>
			}
			{...props}
		/>
	);
}
