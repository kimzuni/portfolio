"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import {
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@/components/ui/collapsible";
import {
	Sidebar as Base,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuAction,
	SidebarMenuSub,
	SidebarMenuSubItem,
	SidebarMenuSubButton,
	useSidebar,
} from "@/components/ui/sidebar";
import { Icon } from "@/components/icon";
import { Link } from "@/components/link";



export interface SidebarNavLink {
	href: string;
	label: string;
}

export interface SidebarNavGroup {
	href: string;
	label: string;
	items?: SidebarNavLink[];
}

export interface SidebarProps extends Omit<React.ComponentProps<typeof Base>, "children"> {
	label: string;
	navGroups: SidebarNavGroup[];
}

export function Sidebar({
	label,
	navGroups,
	...props
}: SidebarProps) {
	const stripPath = (to: string) => to.replace(/\/(index\.html)?$/, "");
	const { isMobile, open, setOpenMobile } = useSidebar();

	const pathname = stripPath(usePathname());
	const isActive = (to: string) => stripPath(to) === pathname;

	useEffect(() => {
		if (isMobile) {
			setOpenMobile(false);
		}
	}, [pathname, isMobile, setOpenMobile]);

	return (
		<Base inert={!open} {...props}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>{label}</SidebarGroupLabel>
					<SidebarGroupContent className="font-mono">
						<SidebarMenu>
							{navGroups.map(({ label, href, items }) => (
								<Collapsible key={href} className="group/collapsible" defaultOpen asChild>
									<SidebarMenuItem>
										<SidebarMenuButton isActive={isActive(href)} asChild>
											<Link href={href}><span>{label}</span></Link>
										</SidebarMenuButton>
										{items && (
											<>
												<SidebarMenuAction hidden={!items.length} aria-hidden={!items.length} asChild>
													<CollapsibleTrigger className="transition-transform data-[state=open]:rotate-90">
														<Icon icon="ChevronRight"/>
														<span className="sr-only">Toggle</span>
													</CollapsibleTrigger>
												</SidebarMenuAction>
												<CollapsibleContent asChild>
													<SidebarMenuSub>
														{items.map(item => (
															<SidebarMenuSubItem key={item.href}>
																<SidebarMenuSubButton isActive={isActive(item.href)} asChild>
																	<Link href={item.href}><span>{item.label}</span></Link>
																</SidebarMenuSubButton>
															</SidebarMenuSubItem>
														))}
													</SidebarMenuSub>
												</CollapsibleContent>
											</>
										)}
									</SidebarMenuItem>
								</Collapsible>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Base>
	);
}
