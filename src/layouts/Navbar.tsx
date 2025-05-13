import { useRef, useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router";

import { useAnimateInView, useIsInViewport } from "../hooks";

import { UList } from "../components";
import { MenuBtn } from "../components";
import Socials, { SocialItem } from "./Socials";



export interface NavbarItem {
	label: string;
	href: string;
}

export interface NavbarProps extends React.ComponentPropsWithoutRef<"nav"> {
	items?: NavbarItem[];
	socials?: SocialItem[];
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}



const bodyOverflowHidden = (hidden: boolean): undefined | number => {
	const scrollWidth = window.innerWidth - document.body.clientWidth;
	const body = document.body;
	body.style.overflow = hidden ? "hidden": "";
	body.style.paddingRight = hidden ? `${scrollWidth}px`: "";
	return !hidden ? undefined : scrollWidth;
}

export default function Navbar({
	items=[],
	socials=[],
	isOpen,
	setIsOpen,
	className="",
	style={},
	children,
	...props
}: NavbarProps) {
	const [headerTop, setHeaderTop] = useState(0);
	const headerRef = useRef<HTMLElement>(null);
	const navRef = useAnimateInView(isOpen, { collapseOnHide: true });
	const [btnRef, btnIsVisible] = useIsInViewport<HTMLButtonElement>();

	useEffect(() => {
		setIsOpen(false);
	}, [btnIsVisible, setIsOpen]);

	const updateHeaderTop = useCallback(() => {
		const header = headerRef.current;
		if (!header) return;

		const { innerHeight } = window;
		const { top, bottom, height } = header.getBoundingClientRect();
		const toTop = 0 < innerHeight - (top + bottom);
		const offset = !isOpen ? 0 : toTop ? -top-8 : Math.max(0, innerHeight - top - height);
		setHeaderTop(offset);
	}, [isOpen]);

	useEffect(() => {
		bodyOverflowHidden(isOpen);
		updateHeaderTop();
	}, [isOpen, updateHeaderTop]);

	return (
		<header
			ref={headerRef}
			className={`
				@container-[size]/navbar
				sticky -top-2 bottom-0 z-50
				-mt-2 pt-2
				flex gap-x-4 px-4
				h-18 leading-16
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
			<h1
				className="flex-1 flex items-center px-2 text-theme-text-dark"
				children={children}
			/>
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
				aria-hidden={btnIsVisible && !isOpen}
			>
				<div
					className={`
						flex flex-col gap-y-4
						py-8 overflow-auto h-full
						[&>ul]:flex [&>ul]:justify-center
						[&>ul]:mx-auto

						md:flex-row md:p-0 md:h-auto md:gap-x-1
						md:overflow-visible
					`.replace(/\s+/g, " ").trim()}
				>
					<UList
						items={items}
						render={({ href, label }) => <NavLink className="block outline-current md:px-2" to={href}>{label}</NavLink>}
						className={`
							flex-col w-64 leading-13
							[&>li]:border-b-1

							md:flex-row md:w-auto
							md:leading-[inherit]
							md:[&>li]:border-0
						`.replace(/\s+/g, " ").trim()}
					/>

					{btnIsVisible && <Socials items={socials} className="md:hidden!"/>}
				</div>
			</nav>
			<MenuBtn
				ref={btnRef}
				className={`
					md:hidden p-4
					h-[100cqh] w-[100cqh]
					${isOpen ? "active" : ""}
				`.replace(/\s+/g, " ").trim()}
				onClick={() => setIsOpen(p => !p)}
				aria-expanded={isOpen}
				aria-controls="nav"
				tabIndex={1}
			/>
		</header>
	);
}
