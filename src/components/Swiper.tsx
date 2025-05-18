import type { SwiperModule } from "swiper/types";
import { EffectFade, A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperBase, SwiperProps as SwiperPropsBase, SwiperSlide } from "swiper/react";

import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";



export interface SwiperProps<T> extends Omit<SwiperPropsBase, "children" | "modules"> {
	items?: T[];
	render?: (item: T) => React.ReactNode;
};

export default function Swiper<T>({
	items=[],
	render,
	effect="fade",
	fadeEffect={},
	a11y={},
	navigation,
	className="",
	style={},
	loop=false,
	...props
}: SwiperProps<T>) {
	const modules: SwiperModule[] = [];

	if (a11y) modules.push(A11y);
	if (props.autoplay) modules.push(Autoplay);
	if (props.pagination) modules.push(Pagination);
	if (effect === "fade") modules.push(EffectFade);
	if (navigation) {
		modules.push(Navigation);
		navigation = navigation === true ? {} : navigation;
	}

	if (items.length === 0) return undefined;

	return (
		<SwiperBase
			a11y={{
				...(!navigation ? {} : {
					prevSlideMessage: "Previous slide",
					nextSlideMessage: "Next slide",
				}),
				...a11y,
			}}
			className={`@container/swiper ${className}`.trim()}
			effect={effect}
			fadeEffect={effect !== "fade" ? undefined : {
				crossFade: true,
				...fadeEffect,
			}}
			navigation={navigation && {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
				...navigation,
			}}
			modules={modules}
			style={{
				"--swiper-navigation-sides-offset": "10px",
				...style,
			} as React.CSSProperties}
			loop={items.length <= 1 ? false : loop}
			{...props}
		>
			{items.map((item, idx) => <SwiperSlide key={idx} className="h-auto!">
				{
					render !== undefined
					? render(item)
					: item as React.ReactNode
				}
			</SwiperSlide>)}
			{!navigation || (navigation.nextEl || navigation.prevEl) ? undefined : <>
				<button
					className="swiper-button-prev after:content-['']! px-1"
					children={<FaAngleLeft/>}
				/>
				<button
					className="swiper-button-next after:content-['']! px-1"
					children={<FaAngleRight/>}
				/>
			</>}
		</SwiperBase>
	);
}
