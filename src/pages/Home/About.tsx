import { Img, Section, SectionProps, Swiper } from "../../components";



export interface AboutItem {
	title: string;
	items: Array<{
		th: string;
		td: string | React.ReactElement;
	}>;
}

export interface AboutProps extends SectionProps {
	items: AboutItem[];
	avatar?: string;
}

export default function About({
	items,
	avatar,
	className="",
	...props
}: AboutProps) {
	return (
		<Section
			className={`
				${className}
				flex flex-col items-center gap-y-16 px-0!
				md:flex-row md:pt-64!
			`.replace(/\s+/g, " ").trim()}
			{...props}
		>
			{avatar &&
				<Section.Animation
					className={`
						md:flex md:justify-center md:items-center
						md:bg-theme-bg-light-sub
						md:rounded-r-4xl md:max-w-130
					`.replace(/\s+/g, " ").trim()}
				>
					<Img
						src={avatar}
						className="md:max-h-80 md:p-[10%]"
					/>
				</Section.Animation>
			}
			<Section.Animation className="flex-1 px-6 w-full max-w-130 md:min-w-130 md:max-w-none">
				<Swiper
					className="px-8! md:max-w-130 md:px-12!"
					slidesPerView={1}
					navigation={true}
					items={items}
					render={(item) => <>
						<h2 className={`title flex-1 px-2 text-center md:text-left`.trim()}>{item.title}</h2>
						<table
							className={`
								[&_a]:underline
								leading-7 mx-auto
								[&_th,&_td]:py-1
								[&_th,&_td]:align-text-top

								md:mx-0
							`.replace(/\s+/g, " ").trim()}
						>
							<tbody>
								{item.items.map(item => <tr key={item.th}>
									<th><p
										className={`
											pr-2 text-right text-nowrap
										`.replace(/\s+/g, " ").trim()}
										children={item.th}
									/></th>
									<td><p
										className={`
											pl-2 border-l-2
											border-theme-primary
										`.replace(/\s+/g, " ").trim()}
										children={item.td}
									/></td>
								</tr>)}
							</tbody>
						</table>
					</>}
				/>
			</Section.Animation>
		</Section>
	);
}
