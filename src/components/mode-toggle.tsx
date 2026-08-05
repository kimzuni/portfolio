"use client";

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



export interface ModeToggleProps extends React.ComponentProps<typeof Button> {
}

export function ModeToggle(props: ModeToggleProps) {
	const { theme, themes, setTheme } = useTheme();

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
				{themes.map(curr => (
					<DropdownMenuRadioGroup
						key={curr}
						value={theme}
						onValueChange={setTheme}
					>
						<DropdownMenuRadioItem value={curr} className="capitalize font-mono">
							{curr}
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
