import * as items from "../../items";

import Intro from "./Intro";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contacts from "./Contacts";



export default function Home() {
	return (<>
		<Intro
			item={items.intro}
			className="order-first h-lvh pt-0 pb-[calc(100lvh-100svh+64px)]"
		/>
		<About
			avatar={items.avatar}
			items={items.about}
		/>
		<Skills
			items={items.skills}
		/>
		<Projects
		/>
		<Contacts
			items={items.contacts}
		/>
	</>);
}
