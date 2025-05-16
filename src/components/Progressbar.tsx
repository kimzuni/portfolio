import { useIsInViewport } from "../hooks";



export interface ProgressbarProps extends Omit<React.ComponentPropsWithoutRef<"div">, "aria-valuenow"> {
	value: number;
	color?: string;
	bgColor?: string;
	barColor?: string;
	barRadius?: string;
}



export default function Progressbar({
	value=0,
	color="var(--color-theme-text-dark)",
	bgColor="var(--color-theme-bg-light-sub)",
	barColor="var(--color-theme-primary)",
	barRadius="calc(infinity * 1px)",
	...props
}: ProgressbarProps) {
	const [ref, isInViewport] = useIsInViewport<HTMLDivElement>({ threshold: 1 });
	value = Math.min(100, Math.max(0, value));

	return (
		<div
			ref={ref}
			className={`
				relative overflow-hidden
				w-full h-6 leading-6
				text-center text-sm text-(--text)
				bg-(--bg) rounded-full

				before:content-[attr(aria-valuenow)"%"]
				before:block
				before:bg-(--bar) before:rounded-(--r)
				before:max-w-full before:h-full
				before:transition-[width]
				before:duration-500
				${isInViewport ? "before:w-(--v)" : "before:w-[0%]"}
			`.replace(/\s+/g, " ").trim()}
			style={{
				"--text": color,
				"--bg": bgColor,
				"--bar": barColor,
				"--r": barRadius,
				"--v": `${value}%`,
			} as React.CSSProperties}
			role="progressbar"
			aria-label="Progress"
			aria-valuenow={value}
			aria-valuemin={0}
			aria-valuemax={100}
			{...props}
		/>
	);
}
