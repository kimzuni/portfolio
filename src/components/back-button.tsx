"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";



function decorate<S>(state: S) {
	return Object.assign(
		{},
		state,
		{ isInternal: true },
	);
}

export function BackButtonProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		const pushState = history.pushState;
		const replaceState = history.replaceState;

		history.pushState = function(state, ...args) {
			return pushState.apply(this, [decorate(state), ...args]);
		};
		history.replaceState = function(state, ...args) {
			return replaceState.apply(this, [decorate(state), ...args]);
		};

		return () => {
			history.pushState = pushState;
			history.replaceState = replaceState;
		};
	}, []);

	return <>{children}</>;
}



export interface BackButtonProps extends React.ComponentProps<typeof Button> {
}

export function BackButton({
	onClick,
	...props
}: BackButtonProps) {
	const router = useRouter();
	const pathname = usePathname();
	if (pathname === "/") {
		return null;
	}

	const handleClick: typeof onClick = (e) => {
		if (onClick) {
			onClick(e);
		}

		const state: AppState = history.state;
		if (!e.defaultPrevented) {
			if (state?.isInternal) {
				history.back();
			} else {
				router.push("/");
			}
		}
	};

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			onClick={handleClick}
			{...props}
		/>
	);
}
