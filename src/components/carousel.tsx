import { cn } from "@/lib/utils";

import {
	Carousel as BaseCarousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	type CarouselApi,
	useCarousel,
} from "@/components/ui/carousel";



export {
	type CarouselApi,
	useCarousel,
};



export interface CarouselItemProps extends React.ComponentProps<typeof CarouselItem> {
}

export { CarouselItem };

export interface CarouselProps extends React.ComponentProps<typeof BaseCarousel> {
}

export function Carousel({
	opts,
	className,
	children,
	...props
}: CarouselProps) {
	return (
		<BaseCarousel
			className={cn(
				"mx-12 *:px-2",
				className,
			)}
			opts={{
				align: "start",
				dragFree: true,
				...opts,
			}}
			{...props}
		>
			<CarouselContent className="py-2 items-stretch">
				{children}
			</CarouselContent>
			<CarouselPrevious/>
			<CarouselNext/>
		</BaseCarousel>
	);
}
