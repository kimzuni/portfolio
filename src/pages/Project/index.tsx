import { useState } from "react";

import { ScrollFade, Shield, Img, Swiper, Progressbar, Modal, Button } from "../../components";
import type { ShieldProps, CustomBadgeProps, BadgeProps, WorkflowBadgeProps, TagBadgeProps, BadgeOptions, BadgeLinkProps, ProgressbarOptions } from "../../components";

import Section from "./Section";



export type URPartial<T extends ShieldProps> = Omit<T, "user" | "repo"> & {
	user?: string;
	repo?: string;
};

export type URPartialProps =
	| CustomBadgeProps
	| URPartial<BadgeProps<"github">>
	| URPartial<BadgeProps<"docker">>
	| URPartial<WorkflowBadgeProps>
	| URPartial<TagBadgeProps>
;

export interface BadgeOptions1 extends BadgeOptions {
	items: ShieldProps[] | ShieldProps[][];
}

export interface BadgeOptions2 extends BadgeOptions {
	user: string;
	repo: string;
	items: URPartialProps[] | URPartialProps[][];
}

export interface ProjectProps {
	title: string;
	date: [Date] | [Date, Date];
	contribution?: Array<{
		label: string;
		percentage: number;
	} & Omit<ProgressbarOptions, "value">>;
	skills?: Array<Omit<BadgeOptions, "style" | "labelColor"> & BadgeLinkProps<"badge">>;
	badges?: BadgeOptions1 | BadgeOptions2;
	sections?: Array<{
		reverse?: boolean;
		images?: Array<{
			src: string;
			alt?: string;
		}>;
		description?: React.ReactNode[];
	}>;
}



const dateToString = (date?: Date) => {
	return date?.toISOString().split("T")[0];
};

export default function Project({
	title,
	date,
	contribution,
	skills,
	badges,
	sections=[],
}: ProjectProps) {
	const [modalOpen, setModalOpen] = useState(false);

	if (badges) {
		badges.items = (Array.isArray(badges.items[0]) ? badges.items : [badges.items]) as ShieldProps[][] | URPartialProps[][];
	}

	return (<>
		<Section className="md:mb-8">
			<ScrollFade>
				<h2 className="title">{title}</h2>
			</ScrollFade>
			<ScrollFade className="flex justify-center flex-wrap gap-2 mb-8">
				<span>{dateToString(date[0])}</span>
				<span>~</span>
				<span className="empty:hidden">{dateToString(date[1])}</span>
			</ScrollFade>
			{badges && skills &&
				<div className="my-8 flex flex-col gap-4">
					{badges && <ScrollFade className="flex flex-col gap-2">
						{badges.items.map((box, idx) => <div key={idx} className="flex justify-center flex-wrap gap-2">
							{(box as unknown as ShieldProps[][] | URPartialProps[][]).map((props, idx) =>
								// @ts-expect-error: TS2322
								<Shield
									key={idx}
									{...badges}
									{...props}
								/>
							)}
						</div>)}
					</ScrollFade>}
					{skills && <ScrollFade className="flex justify-center flex-wrap gap-2">
						{skills.map(({ label, color="5CC9FF", logo, ...props }) =>
							<Shield
								key={label}
								service="badge"
								badge={`${label}-${color}`}
								logo={logo || label?.toLowerCase()}
								logoColor="white"
								{...props}
							/>
						)}
					</ScrollFade>}
				</div>
			}
			{contribution && <ScrollFade>
				<Button
					className="mx-auto"
					onClick={() => setModalOpen(true)}
					aria-haspopup="dialog"
					aria-controls="contribution"
					children="프로젝트 기여도"
				/>
			</ScrollFade>}
		</Section>

		{sections.map(({ images=[], description, reverse }, idx) => {
			reverse = reverse || (idx & 1) === 1;

			return (
				<Section key={idx} className={`flex flex-col gap-10 mt-16 px-0 [&_a]:underline [&_a]:text-theme-primary [&_a]:hover:text-theme-dark ${reverse ? "md:flex-row-reverse" : "md:flex-row"} md:px-(--section-px) md:items-center`}>
					{images.length !== 0 &&
						<ScrollFade className={`shadow-xl overflow-hidden md:rounded-3xl ${description ? "flex-1" : "p-12 bg-white md:w-full"}`}><Swiper
							effect="slide"
							items={images}
							render={img => <Img {...img} className="min-h-full min-w-full md:border-1 md:border-theme-text-dark-sub/25"/>}
							navigation={true}
							loop={true}
						/></ScrollFade>
					}
					{description &&
						<ScrollFade className={`flex-1 flex flex-col gap-6 mx-auto text-center px-(--section-px) leading-7 ${reverse ? "md:text-right" : "md:text-left"}`}>
							{description.map((x, i) => {
								const Elem = typeof x === "string" ? "p" : "div";
								return <Elem
									key={i}
									children={x}
								/>
							})}
						</ScrollFade>
					}
				</Section>
			);
		})}

		{contribution &&
			<Modal
				id="contribution"
				modalTitle="프로젝트 기여도"
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				className="flex flex-col gap-3"
			>
				{contribution.map(({ label, percentage, ...opts }) => <div key={label}>
					<span className="font-semibold">{label}</span>
					<Progressbar value={percentage} {...opts}/>
				</div>)}
			</Modal>
		}
	</>);
}
