import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/link";
import { Icon, type IconName } from "@/components/icon";



export interface LinkButtonProps extends Omit<React.ComponentProps<typeof Button>, "render" | "children"> {
	label: string;
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
	className,
	variant = "default",
	...props
}: LinkButtonProps) {
	const children = (
		<>
			{icon && (
				<Icon
					icon={icon}
					className={cn(
						"group-hover:translate-x-(--tx) group-hover:translate-y-(--ty) group-hover:rotate-(--rotate)",
						"group-hover:scale-(--scale)",
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
		</>
	);

	return (
		<Button
			variant={variant}
			nativeButton={!href}
			className={cn(
				"group flex items-center",
				iconPosition === "left" ? "flex-row" : "flex-row-reverse",
				variant === "default" ? "rounded-full" : "",
				className,
			)}
			render={
				!href
					? <button>{children}</button>
					: <Link href={href}>{children}</Link>
			}
			{...props}
		/>
	);
}
