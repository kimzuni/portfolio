import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation, useNavigate, ScrollRestoration } from "react-router";

import { Icons } from "../components";
import * as items from "../items";

import bodyOverflowHidden from "./bodyOverflowHidden";
import Navbar from "./Navbar";
import Footer from "./Footer";



export interface useLayoutContextType {
	navOpen: boolean;
	setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
	goBack: () => void;
	bodyOverflowHidden: typeof bodyOverflowHidden;
};

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

	const updatePathname = useCallback(() => {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
		setNavOpen(false);
	}, []);

	useEffect(() => {
		updatePathname();
	}, [pathname, updatePathname]);

	return (<>
		<ScrollRestoration/>
		<main className="flex flex-col">
			<Navbar
				className={pathname === "/" ? "" : "pl-2"}
				items={items.nav}
				socials={items.socials}
				isOpen={navOpen}
				setIsOpen={setNavOpen}
			>
				{pathname !== "/" && <button className="p-1" type="button" aria-label="Back" onClick={goBack}><Icons.Left size="1.2rem"/></button>}
				<span translate="no">KIM JOON HEE</span>
			</Navbar>
			<Outlet context={{
				navOpen, setNavOpen,
				goBack, bodyOverflowHidden,
			}}/>
		</main>
		<Footer translate="no" className="mt-20">
			&copy; {new Date().getFullYear()} zuni.kim
		</Footer>
	</>);
}
