import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, ScrollRestoration } from "react-router";
import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";

import Navbar, { NavbarItem, SocialItem } from "./Navbar";
import Footer from "./Footer";



export interface useLayoutContextType {
	navOpen: boolean;
	setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
	goBack: () => void;
};



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
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [navOpen, setNavOpen] = useState(false);

	const goBack = () => {
		if (window.history.state.idx) {
			navigate(-1);
		} else {
			navigate("/");
		}
	};

	useEffect(() => {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
		setNavOpen(false);
	}, [pathname]);

	return (<>
		<ScrollRestoration/>
		<main className="flex flex-col">
			<Navbar
				items={navItems}
				socials={socials}
				isOpen={navOpen}
				setNavOpen={setNavOpen}
			>
				{pathname !== "/" && <button type="button" aria-label="Back" onClick={goBack}><FaAngleLeft/></button>}
				<span translate="no">KIM JOON HEE</span>
			</Navbar>
			<Outlet context={{
				navOpen, setNavOpen,
				goBack,
			}}/>
		</main>
		<Footer translate="no">
			&copy; {new Date().getFullYear()} zuni.kim
		</Footer>
	</>);
}
