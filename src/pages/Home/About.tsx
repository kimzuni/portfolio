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
				flex flex-col items-center gap-y-8 px-0!
				md:flex-row md:items-stretch md:pt-64!
			`.replace(/\s+/g, " ").trim()}
			{...props}
		>
			{avatar &&
				<Section.Animation
					className={`
						md:flex md:justify-center md:items-center
						md:bg-theme-bg-light-sub md:shadow-lg
						md:rounded-r-4xl
					`.replace(/\s+/g, " ").trim()}
				>
					<Img
						src={avatar}
						className="md:max-h-80 md:p-[10%] rounded-b-4xl md:rounded-none"
					/>
				</Section.Animation>
			}
			<Section.Animation className="m-auto flex-1 px-6 w-full max-w-130 md:min-w-130 md:max-w-130">
				<p
					className={`
						mb-16 md:mb-4 px-14
						text-center md:text-left
					`.replace(/\s+/g, " ").trim()}
				>
					안녕하세요! 아, 제가 누구냐구요?
				</p>
				<Swiper
					className="px-8! md:px-12! font-medium"
					slidesPerView={1}
					navigation={true}
					items={items}
					render={(item) => <>
						<h2 className="title flex-1 px-2 text-center md:text-left">{item.title}</h2>
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
