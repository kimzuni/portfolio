import { useState } from "react";
import { ScrollFade, Shield, Img, Swiper, Progressbar, Modal, Button } from "../../components";
import type { ShieldProps, CustomBadgeProps, BadgeProps, WorkflowBadgeProps, TagBadgeProps, BadgeOptions, BadgeLinkProps, ProgressbarProps } from "../../components";

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
	date?: [string] | [string, string];
	categories?: string[];
	contribution?: Array<{
		label: string;
		percentage: number;
	} & Omit<ProgressbarProps, "value">>;
	skills?: Array<Omit<BadgeOptions, "style" | "labelColor"> & BadgeLinkProps<"badge">>;
	badges?: BadgeOptions1 | BadgeOptions2;
	sections: Array<{
		images?: Array<{
			src: string;
			alt?: string;
		}>;
		description?: React.ReactNode;
	}>;
}



export default function Project({
	title,
	date,
	contribution,
	skills=[],
	badges,
	sections=[],
}: ProjectProps) {
	const [modalOpen, setModalOpen] = useState(false);

	if (badges) {
		badges.items = (Array.isArray(badges.items[0]) ? badges.items : [badges.items]) as ShieldProps[][] | URPartialProps[][];
	}

	return (<>
		<Section className="mb-0!">
			<ScrollFade>
				<h2 className="title">{title}</h2>
			</ScrollFade>
			{date && <ScrollFade className="flex justify-center flex-wrap gap-2 mb-8">
				<span>{date[0]}</span>
				<span>~</span>
				<span>{date[1]}</span>
			</ScrollFade>}
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
				<ScrollFade className="flex justify-center flex-wrap gap-2">
					{skills.map(({ label, color="5CC9FF", logo, logoColor="white", ...props }) =>
						<Shield
							key={label}
							service="badge"
							badge={`${label}-${color}`}
							logo={logo || label?.toLowerCase()}
							logoColor={logoColor}
							{...props}
						/>
					)}
				</ScrollFade>
			</div>
			{contribution && <ScrollFade>
				<Button
					className="mx-auto"
					onClick={() => setModalOpen(true)}
					aria-haspopup="dialog"
					aria-controls="contribution"
					children="프로젝트 기여도 보기"
				/>
			</ScrollFade>}
		</Section>

		{sections.map(({ images=[], description }, idx) => {
			images = Array.isArray(images) ? images : [images];

			return <Section key={idx} className={`flex flex-col gap-8 ${idx & 1 ? "md:flex-row-reverse" : "md:flex-row"} px-0 md:px-(--section-px) md:items-center`}>
				<ScrollFade className="md:w-full md:max-w-130"><Swiper
					effect="slide"
					items={images}
					render={img => <Img {...img}/>}
					navigation={true}
				/></ScrollFade>
				<ScrollFade className={`flex-1 text-center px-(--section-px) md:px-0 ${idx & 1 ? "md:text-right" : "md:text-left"}`}>{description}</ScrollFade>
			</Section>
		})}

		{contribution &&
			<Modal
				id="contribution"
				modalTitle="프로젝트 기여도"
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			>
				{contribution.map(({ label, percentage }) => <div key={label} className="flex-1 basis-64">
					<span>{label}</span>
					<Progressbar
						value={percentage}
					/>
				</div>)}
			</Modal>
		}
	</>);
}
