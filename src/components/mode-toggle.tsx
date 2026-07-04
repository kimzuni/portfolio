"use client";

import { useTheme } from "next-themes";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
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
					<DropdownMenuItem
						key={curr}
						onClick={() => setTheme(curr)}
						className="flex justify-between items-center gap-2"
					>
						<span className="capitalize font-mono">
							{curr}
						</span>
						{theme === curr && <Icon icon="Check" className="text-primary"/>}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
