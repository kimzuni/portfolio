import { Outlet, ScrollRestoration } from "react-router";

import Navbar, { NavbarItem, SocialItem } from "./Navbar";
import Footer from "./Footer";



const navItems: NavbarItem[] = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Projects",
		href: "/projects",
	},
];

const socials: SocialItem[] = [
	{
		icon: "github",
		href: "https://github.com/jh1950",
	},
	{
		icon: "github",
		href: "https://github.com/kimzuni",
	},
];



export default function Layout() {
	return (<>
		<ScrollRestoration/>
		<main className="flex flex-col">
			<Navbar text="KIM JOON HEE" items={navItems} socials={socials}/>
			<Outlet/>
		</main>
		<Footer>
			&copy; {new Date().getFullYear()} zuni.kim
		</Footer>
	</>);
}
