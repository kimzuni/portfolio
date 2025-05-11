import { NavigationOptions } from "swiper/types";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperBase, SwiperProps as SwiperPropsBase, SwiperSlide } from "swiper/react";

import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";



export interface SwiperProps<T> extends Omit<SwiperPropsBase, "children" | "modules"> {
	navigation?: boolean | Omit<NavigationOptions, "nextEl" | "prevEl">;
	items?: T[];
	render?: (item: T) => React.ReactNode;
};

export default function Swiper<T>({
	items=[],
	render,
	effect="fade",
	fadeEffect={},
	navigation,
	className="",
	style={},
	...props
}: SwiperProps<T>) {
	const modules = [EffectFade];
	if (props.autoplay) modules.push(Autoplay);
	if (props.pagination) modules.push(Pagination);
	if (navigation) {
		modules.push(Navigation);
		navigation = navigation === true ? {} : navigation;
	}

	return (
		<SwiperBase
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
				"--swiper-navigation-sides-offset": "0px",
				...style,
			} as React.CSSProperties}
			{...props}
		>
			{items.map((item, idx) => <SwiperSlide key={idx}>
				{
					render !== undefined
					? render(item)
					: item as React.ReactNode
				}
			</SwiperSlide>)}
			<button
				className="swiper-button-prev after:content-['']! px-1"
				children={<FaAngleLeft/>}
			/>
			<button
				className="swiper-button-next after:content-['']! px-1"
				children={<FaAngleRight/>}
			/>
		</SwiperBase>
	);
}
