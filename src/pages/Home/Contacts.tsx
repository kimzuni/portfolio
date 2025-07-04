import { getIcon } from "../../utils";
import { SocialItem } from "../../layouts/Socials";
import { Link, Button, ScrollFade } from "../../components";

import Section, { SectionProps } from "./Section";



export interface ContactItem extends SocialItem {
	label: string;
};

export interface ContactsProps extends SectionProps {
	items: ContactItem[];
};

export default function Contacts({
	items=[],
	className="",
	...props
}: ContactsProps) {
	return (
		<Section id="contacts" className={`${className} pb-0!`.trim()} {...props}>
			<ScrollFade className="text-center">
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
			</ScrollFade>
			<ScrollFade className="flex flex-col items-center mt-20 text-center">
				<h3
					className="title text-base"
					children="익명으로 전하고 싶은 말이 있으신가요?"
				/>
				<Button
					as={Link}
					to="https://mail.kimzuni.com"
					children="그렇다면 이쪽으로!"
				/>
			</ScrollFade>
		</Section>
	);
}
