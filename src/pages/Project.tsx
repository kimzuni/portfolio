import { Section, Shield } from "../components";
import type { ShieldProps, CustomBadgeProps, BadgeProps, WorkflowBadgeProps, TagBadgeProps, BadgeOptions } from "../components";



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
	pin?: boolean;
	title: string;
	date?: [string] | [string, string];
	categories?: string[];
	skills?: Array<{
		label: string;
		color: string;
		logo?: string;
		logoColor?: string;
	}>;
	badges?: BadgeOptions1 | BadgeOptions2;
};



export default function Project({
	title,
	date,
	skills=[],
	badges,
}: ProjectProps) {
	if (badges) {
		badges.items = (Array.isArray(badges.items[0]) ? badges.items : [badges.items]) as ShieldProps[][] | URPartialProps[][];
	}

	return (<>
		<Section>
			<h2 className="title">{title}</h2>
			<div className="my-8 flex flex-col gap-4">
				{badges && <Section.Animation className="flex flex-col gap-2">
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
				</Section.Animation>}
				<Section.Animation className="flex justify-center flex-wrap gap-2">
					{skills.map(({label, color, logo, logoColor="white" }) =>
						<Shield
							key={label}
							service="badge"
							badge={`${label}-${color}`}
							logo={logo || label}
							logoColor={logoColor}
						/>
					)}
				</Section.Animation>
				{date && <Section.Animation className="flex justify-center flex-wrap gap-2">
					<span>{date[0]}</span>
					<span>~</span>
					<span>{date[1]}</span>
				</Section.Animation>}
			</div>
		</Section>
	</>);
}
