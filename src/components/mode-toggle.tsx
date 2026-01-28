"use client";

import { useTheme } from "next-themes";

import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Icon } from "./icon";



export interface ModeToggleProps extends React.ComponentProps<typeof Button> {
}

export function ModeToggle(props: ModeToggleProps) {
	const { theme, themes, setTheme } = useTheme();

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" {...props}>
					<Icon icon="Sun" className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
					<Icon icon="Moon" className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{themes.map(curr => (
					<DropdownMenuItem
						key={curr}
						onClick={() => setTheme(curr)}
						className="flex justify-between items-center gap-2"
					>
						<span
							className="capitalize font-mono"
							children={curr}
						/>
						{theme === curr && <Icon icon="Check" className="text-primary"/>}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
