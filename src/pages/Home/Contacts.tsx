import { getIcon } from "../../utils";
import { SocialItem } from "../../layouts/Socials";
import { Link, Button, Section, SectionProps } from "../../components";



export interface Contact extends SocialItem {
	label: string;
};

export interface ContactsProps extends SectionProps {
	items: Contact[];
};

export default function Contacts({
	items=[],
	className="",
	...props
}: ContactsProps) {
	return (
		<Section
			className={`
				${className}
				pb-0!
			`.replace(/\s+/g, " ").trim()}
			{...props}
		>
			<Section.Animation className="text-center">
				<h2 className="title">Contacts</h2>
				<div
					className={`
						my-8
						flex flex-col gap-y-6 gap-x-18
						md:flex-row md:justify-center md:items-center
					`.replace(/\s+/g, " ").trim()}
				>
					<p className="flex-1 md:text-right">
						제가 해야 할 일이 있나요?<br/>
						언제든지 편하게 말씀해 주세요!<br/>
					</p>
					<div className="flex-1 flex flex-col items-center font-normal md:items-start">
						{items.map(({ label, icon, href }) =>
							<Link
								key={label}
								to={href}
								className="flex justify-center items-center gap-1 underline"
								children={<>
									{getIcon(icon)}
									{label}
								</>}
							/>
						)}
					</div>
				</div>
			</Section.Animation>
			<Section.Animation className="flex flex-col items-center my-20 text-center">
				<h3
					className="title text-lg!"
					children="혹시 익명으로 저에게 할 말이 있으신가요?"
				/>
				<Button
					as={Link}
					to="https://mail.kimzuni.com"
					children="그렇다면 저를 따라오세요!"
				/>
			</Section.Animation>
		</Section>
	);
}
