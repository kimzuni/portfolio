"use client";

import { useRef, useEffect, startTransition } from "react";

import { cn } from "@/lib/utils";
import { setCookie } from "@/app/actions";
import { useNavigation } from "@/hooks/use-navigation";

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
	SidebarFooter,
	useSidebar,
} from "@/components/ui/sidebar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/icon";
import { Link } from "@/components/link";

import type * as contents from "@/contents";



export interface SidebarProps extends Omit<React.ComponentProps<typeof Base>, "children"> {
	label: string;
	items: contents.link.Item[];
	autoClose: boolean;
	autoCloseKey: string;
}

export function Sidebar({
	label,
	items,
	autoClose = false,
	autoCloseKey,
	...props
}: SidebarProps) {
	const { isMobile, open, setOpenMobile, setOpen } = useSidebar();
	const navigation = useNavigation();
	const prevPath = useRef(navigation.pathname);

	useEffect(() => {
		if (isMobile) {
			setOpenMobile(false);
		}
	}, [navigation.pathname, isMobile, setOpenMobile]);

	useEffect(() => {
		if (autoClose && prevPath.current !== navigation.pathname) {
			setOpen(false);
		}
		prevPath.current = navigation.pathname;

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigation.pathname, autoClose]);

	const onCheckedChange = (checked: boolean) => {
		if (autoCloseKey !== undefined) {
			startTransition(async () => {
				await setCookie(autoCloseKey, `${checked}`);
			});
		}
	};

	return (
		<Base inert={!open} {...props}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>{label}</SidebarGroupLabel>
					<SidebarGroupContent className="font-mono">
						<SidebarMenu>
							{items.filter(x => !x.hidden).map(({ label, href, disabled, items }) => (
								<Collapsible
									key={href}
									defaultOpen
									className="group/collapsible"
									render={<SidebarMenuItem>
										<SidebarMenuButton
											className={!disabled ? undefined : "pointer-events-none opacity-50"}
											isActive={navigation.isCurrent(href)}
											render={<Link href={disabled ? "#" : href}><span>{label}</span></Link>}
											disabled={disabled}
											aria-disabled={disabled}
											tabIndex={disabled ? -1 : undefined}
										/>
										{items && (
											<>
												<SidebarMenuAction
													hidden={!items.length}
													aria-hidden={!items.length}
													render={<CollapsibleTrigger className="transition-transform data-panel-open:rotate-90">
														<Icon icon="ChevronRight"/>
														<span className="sr-only">Toggle</span>
													</CollapsibleTrigger>}
												/>
												<CollapsibleContent
													render={<SidebarMenuSub>
														{items.filter(x => !x.hidden).map(item => (
															<SidebarMenuSubItem key={item.href}>
																<SidebarMenuSubButton
																	className={!item.disabled ? undefined : "pointer-events-none opacity-50"}
																	isActive={navigation.isCurrent(item.href)}
																	render={<Link href={item.href}><span>{item.label}</span></Link>}
																	aria-disabled={item.disabled}
																	tabIndex={item.disabled ? -1 : undefined}
																/>
															</SidebarMenuSubItem>
														))}
													</SidebarMenuSub>}
												/>
											</>
										)}
									</SidebarMenuItem>}
								/>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			{!isMobile && (
				<SidebarFooter>
					<FieldGroup>
						<Field orientation="horizontal" className="w-fit mx-auto">
							<Checkbox
								id="sidebar-auto-close-on-page-change"
								checked={autoClose}
								onCheckedChange={onCheckedChange}
							/>
							<FieldLabel
								htmlFor="sidebar-auto-close-on-page-change"
								className={cn(
									"text-xs",
									!autoClose && "text-muted-foreground",
								)}
							>
								Auto-close on page change
							</FieldLabel>
						</Field>
					</FieldGroup>
				</SidebarFooter>
			)}
		</Base>
	);
}
