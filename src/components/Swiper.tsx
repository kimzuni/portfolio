import type { SwiperModule } from "swiper/types";
import { Swiper as SwiperBase, SwiperProps as SwiperPropsBase, SwiperSlide } from "swiper/react";
import { EffectFade, EffectCards, A11y, Autoplay, Navigation, Pagination, FreeMode } from "swiper/modules";

import { Icons } from "../components";



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
	pagination,
	className="",
	style={},
	loop=false,
	cardsEffect={},
	...props
}: SwiperProps<T>) {
	const modules: SwiperModule[] = [];
	if (items.length === 0) return undefined;

	if (props.freeMode) modules.push(FreeMode);
	if (props.autoplay) modules.push(Autoplay);
	if (pagination) {
		modules.push(Pagination);
		pagination = {
			clickable: true,
			...(pagination === true ? {} : pagination),
		};
	}
	if (effect === "fade") {
		modules.push(EffectFade);
		fadeEffect = {
			crossFade: true,
			...fadeEffect,
		};
	}
	if (effect === "cards") {
		modules.push(EffectCards);
		cardsEffect = {
			...cardsEffect,
		};
	}
	if (a11y) {
		modules.push(A11y);
		a11y = {
			...(!navigation ? {} : {
				prevSlideMessage: "Previous slide",
				nextSlideMessage: "Next slide",
			}),
			...a11y,
		};
	}
	if (navigation) {
		modules.push(Navigation);
		navigation = navigation === true ? {} : navigation;
	}

	return (
		<SwiperBase
			a11y={a11y}
			effect={effect}
			modules={modules}
			fadeEffect={fadeEffect}
			cardsEffect={cardsEffect}
			pagination={pagination}
			navigation={navigation && {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev",
				...navigation,
			}}
			loop={items.length <= 1 ? false : loop}
			className={`@container/swiper ${className}`.trim()}
			style={{
				"--swiper-navigation-sides-offset": "10px",
				...style,
			} as React.CSSProperties}
			{...props}
		>
			{items.map((item, idx) => <SwiperSlide key={idx} className="h-auto! w-full!">
				{
					render !== undefined
					? render(item)
					: item as React.ReactNode
				}
			</SwiperSlide>)}
			{!navigation || (navigation.nextEl || navigation.prevEl) ? undefined : <>
				<button
					className="swiper-button-prev after:content-['']! px-1"
					children={<Icons.Left/>}
				/>
				<button
					className="swiper-button-next after:content-['']! px-1"
					children={<Icons.Right/>}
				/>
			</>}
		</SwiperBase>
	);
}
