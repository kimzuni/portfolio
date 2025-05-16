export type ButtonProps<E extends React.ElementType = "button"> = React.PropsWithChildren<React.ComponentPropsWithoutRef<E> & {
	as?: E;
}>;



export default function Button<E extends React.ElementType = "button">({
	as,
	type="button",
	className="",
	...props
}: ButtonProps<E>) {
	const Elem = as || "button";

	return (
		<Elem
			type={as === "button" ? type : undefined}
			className={`
				${className}
				block shadow-md
				bg-theme-primary hover:bg-theme-dark
				rounded-full py-2 px-4
				text-theme-text-dark
				text-sm font-semibold
				transition-[background]
			`.replace(/\s+/g, " ").trim()}
			{...props}
		/>
	);
}
