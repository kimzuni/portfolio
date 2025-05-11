import * as items from "../../items";

import Intro from "./Intro";
import About from "./About";



export default function Home() {
	return (<>
		<Intro
			item={items.intro}
			className="order-first h-lvh pt-0 pb-[calc(100lvh-100svh+64px)]"
		/>
		<About
			avatar="/avatar.png"
			items={items.about}
		/>
		<div>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
			home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>home<br/>
		</div>
	</>);
}
