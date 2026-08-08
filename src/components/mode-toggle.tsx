"use client";

import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";



interface DropdownMenuRadioGroupProps extends React.ComponentProps<typeof DropdownMenuRadioGroup> {
}

export interface ModeToggleProps extends React.ComponentProps<typeof Button> {
}

export function ModeToggle(props: ModeToggleProps) {
	const { theme, themes, resolvedTheme, setTheme } = useTheme();

	const handleThemeChange: DropdownMenuRadioGroupProps["onValueChange"] = (newTheme, details) => {
		const targetResolvedTheme = (
			newTheme === "system"
				? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
				: newTheme
		)

		if (
			targetResolvedTheme === resolvedTheme
			|| !document.startViewTransition                                  // API 미지원 브라우저
			|| window.matchMedia("(prefers-reduced-motion: reduce)").matches  // 모션 줄이기 설정 유저
		) {
			setTheme(newTheme);
			return;
		}

		const e = details.event;
		const x = "clientX" in e ? e.clientX : window.innerWidth / 2;
		const y = "clientY" in e ? e.clientY : window.innerHeight / 2;
		const endRadius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		);
		const transition = document.startViewTransition(() => {
			flushSync(() => setTheme(newTheme));
		});

		transition.ready.then(() => {
			const clipPath = [
				`circle(0px at ${x}px ${y}px)`,
				`circle(${endRadius}px at ${x}px ${y}px)`,
			];

			// 새로 덮어씌워지는 레이어(::view-transition-new)에 원형 확산 애니메이션 적용
			document.documentElement.animate(
				{ clipPath },
				{
					duration: 500,
					easing: "ease-in-out",
					pseudoElement: "::view-transition-new(root)",
				}
			);
		});
	}

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger
				render={<Button variant="ghost" size="icon" {...props}>
					<Icon icon="Sun" className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
					<Icon icon="Moon" className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
					<span className="sr-only">Toggle theme</span>
				</Button>}
			/>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup
					value={theme}
					onValueChange={handleThemeChange}
				>
					{themes.map(curr => (
						<DropdownMenuRadioItem
							key={curr}
							value={curr}
							className="capitalize font-mono"
						>{curr}</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
