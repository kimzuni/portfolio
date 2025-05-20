export interface NoImage extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
	text?: string;
}



export default function NoImage({
	text="No Image :(",
	className="",
	...props
}: NoImage) {
	return (
		<div
			className={`${className} bg-theme-bg-light-sub -z-10 absolute top-0 left-0 h-full w-full inline-flex justify-center items-center font-semibold text-xl text-theme-text-dark`.trim()}
			children={text}
			{...props}
		/>
	);
}
