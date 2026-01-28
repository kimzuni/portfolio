import type { HomeHeroData } from "@/app/_components/page/hero";



export const hero: HomeHeroData = {
	heading: "KIM JOON HEE",
	subheading: "Full-stack Developer",
	tagline: [
		"무언가에 깊게 빠져드는 것을 좋아합니다.",
		"서비스를 만드는 데 필요한 것이라면 영역을 가리지 않고 다루고 있습니다.",
	],
	buttons: [
		{
			variant: "default",
			label: "Read More",
			href: "#about",
			size: "lg",
			icon: "ArrowDown",
			iconTranslateY: 5,
			iconPosition: "right",
		},
	],
};
