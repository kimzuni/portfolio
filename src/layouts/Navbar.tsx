import { useRef, useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { useVisibility } from "../hooks";

import { UList } from "../components";
import { MenuBtn } from "../components";
import { getIcon, IconType } from "./icons";



export interface NavbarItem {
	label: string;
	href: string;
}

export interface SocialItem {
	icon: IconType;
	href: string;
}

export interface NavbarProps extends Omit<React.ComponentPropsWithoutRef<"nav">, "children"> {
	text: string;
	items?: NavbarItem[];
	socials?: SocialItem[];
}



const bodyOverflowHidden = (hidden: boolean): undefined | number => {
	const scrollWidth = window.innerWidth - document.body.clientWidth;
	const body = document.body;
	body.style.overflow = hidden ? "hidden": "";
	body.style.paddingRight = hidden ? `${scrollWidth}px`: "";
	return !hidden ? undefined : scrollWidth;
}

export default function Navbar({
	text,
	items=[],
	socials=[],
	className="",
	style={},
	...props
}: NavbarProps) {
	const { pathname } = useLocation();
	const [isMobile, setIsMobile] = useState(false);
	const [navOpen, setNavOpen] = useState(false);
	const [headerTop, setHeaderTop] = useState(0);
	const btnRef = useRef<HTMLButtonElement>(null);
	const headerRef = useRef<HTMLElement>(null);
	const navRef = useVisibility(navOpen, { hidden: true });

	const btnOnClick = () => {
		setNavOpen(p => !p);
	};

	useEffect(() => {
		setNavOpen(false);
	}, [pathname]);

	useEffect(() => {
		bodyOverflowHidden(navOpen);

		const header = headerRef.current;
		if (header) {
			const { innerHeight } = window;
			const { top, bottom, height } = header.getBoundingClientRect();
			const toTop = 0 < innerHeight - (top + bottom);
			setHeaderTop( !navOpen ? 0 : toTop ? -top : Math.max(0, innerHeight - top - height) )
		}
	}, [navOpen]);

	useEffect(() => {
		const btn = btnRef.current;
		if (!btn) return;

		const abserver = new IntersectionObserver(([entry]) => {
			setIsMobile(entry.isIntersecting);
			setNavOpen(false);
		});

		abserver.observe(btn);
		return () => abserver.disconnect();
	}, []);

	return (
		<header
			ref={headerRef}
			className={`
				@container-[size]/navbar
				sticky top-0 z-50 bottom-0 -mt-2
				flex gap-x-4 px-4
				h-16 leading-16
				text-lg font-bold
				before-backdrop-blur-xs
				textBorder-theme-bg-light

				[&>:not(nav)]:translate-y-(--top)
				[&>:not(nav)]:transition-[translate]
				${className}
			`.replace(/\s+/g, " ").trim()}
			style={{
				"--top": `${headerTop}px`,
				...style,
			} as React.CSSProperties}
			{...props}
		>
			<h1 className="flex-1">
				<Link
					to="/"
					className="inline-block text-theme-text-dark"
					children={text}
					tabIndex={1}
				/>
			</h1>
			<nav
				id="nav"
				ref={navRef}
				className={`
					bg-theme-bg-light
					fixed top-0 left-0 -z-1
					pt-16 h-dvh opacity-0 w-full
					transition-[width]

					md:static md:block! md:opacity-100!
					md:p-0 md:h-full md:w-auto
					md:bg-transparent md:translate-0!
				`.replace(/\s+/g, " ").trim()}
				aria-label="Main Navigation"
				aria-hidden={!navOpen}
			>
				<div
					className={`
						flex flex-col gap-y-4
						py-8 overflow-auto h-full
						[&>ul]:flex [&>ul]:justify-center
						[&>ul]:mx-auto [&_a]:block

						md:flex-row md:p-0 md:h-auto md:gap-x-1
						md:overflow-visible
					`.replace(/\s+/g, " ").trim()}
				>
					<UList
						items={items}
						render={({ href, label }) => <NavLink className="outline-current md:px-2" to={href}>{label}</NavLink>}
						className={`
							flex-col w-64 leading-13
							[&>li]:border-b-1

							md:flex-row md:w-auto
							md:leading-[inherit]
							md:[&>li]:border-0
						`.replace(/\s+/g, " ").trim()}
					/>

					{isMobile &&
						<UList
							items={socials}
							render={({ href, icon }) => <a className="p-2 text-xl" href={href} target="_blank" rel="noopener noreferrer">{getIcon(icon)}</a>}
							className={`flex items-center ${className}`.trim()}
						/>
					}
				</div>
			</nav>
			<MenuBtn
				ref={btnRef}
				className={`
					md:hidden p-4
					h-[100cqh] w-[100cqh]
					${navOpen ? "active" : ""}
				`.replace(/\s+/g, " ").trim()}
				onClick={btnOnClick}
				aria-expanded={navOpen}
				aria-controls="nav"
				tabIndex={2}
			/>
		</header>
	);
}
