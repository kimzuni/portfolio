import { useIsInViewport } from "../hooks";



export interface ProgressbarOptions {
	value: number;
	valuemin?: number;
	valuemax?: number;
	color?: string;
	bgColor?: string;
	barFromColor?: string;
	barToColor?: string;
	barRadius?: string;
}

export interface ProgressbarProps extends Omit<React.ComponentPropsWithoutRef<"div">, "children" | "aria-valuenow" | "aria-valuemin" | "aria-valuemax">, ProgressbarOptions {
}



export default function Progressbar({
	value=0,
	valuemin=0,
	valuemax=100,
	color="var(--color-theme-text-dark)",
	bgColor="var(--color-theme-bg-light-sub)",
	barFromColor="var(--color-theme-primary)",
	barToColor="var(--color-green-500)",
	barRadius="calc(infinity * 1px)",
	...props
}: ProgressbarProps) {
	const [ref, isInViewport] = useIsInViewport<HTMLDivElement>();
	value = Math.min(valuemax, Math.max(valuemin, value));

	return (
		<div
			ref={ref}
			className={`
				relative overflow-hidden
				rounded-full w-full h-6 leading-6
				text-center text-sm font-semibold
				text-(--text) bg-(--bg)
			`.replace(/\s+/g, " ").trim()}
			style={{
				"--text": color,
				"--bg": bgColor,
				"--bar-from": barFromColor,
				"--bar-to": barToColor,
				"--r": barRadius,
				"--v": `${Math.max(0, value)}%`,
			} as React.CSSProperties}
			role="progressbar"
			aria-label="Progress"
			aria-valuenow={value}
			aria-valuemin={valuemin}
			aria-valuemax={valuemax}
			{...props}
			children={<span
				className={`
					block rounded-(--r) h-full max-w-full
					transition-[width] duration-500
					bg-linear-to-r from-(--bar-from) to-(--bar-to)
					${isInViewport ? "w-(--v)" : "w-[0%]"}
					before:content-[attr(data-content)"%"]
					before:px-2
				`.replace(/\s+/g, " ").trim()}
				data-content={value}
			/>}
		/>
	);
}
