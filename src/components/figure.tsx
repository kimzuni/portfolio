import { cn } from "@/lib/utils";



export interface FigCaptionProps extends React.ComponentProps<"figcaption"> {
}

export function FigCaption({
	className,
	...props
}: FigCaptionProps) {
	return (
		<figcaption
			className={cn("empty:hidden text-sm text-muted-foreground text-center", className)}
			{...props}
		/>
	);
}



export interface FigureOption {
	alwaysWrap?: boolean;
	captionPosition?: "top" | "bottom";
	caption?: string;
}

export interface FigureProps extends React.ComponentProps<"figure">, FigureOption {
}

export function Figure({
	alwaysWrap = false,
	captionPosition = "bottom",
	caption,
	children,
	className,
	...props
}: FigureProps) {
	if (!caption && !alwaysWrap) {
		return children;
	}

	return (
		<figure
			className={cn(
				"size-fit",
				className,
			)}
			{...props}
		>
			{captionPosition === "top" && <FigCaption>{caption}</FigCaption>}
			{children}
			{captionPosition === "bottom" && <FigCaption>{caption}</FigCaption>}
		</figure>
	);
}
