import { cookies } from "next/headers";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutBreadcrumbProvider, LayoutBreadcrumb } from "@/components/layout-breadcrumb";
import { BackButtonProvider, BackButton } from "@/components/back-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Icon } from "@/components/icon";

import { Sidebar, SidebarTrigger } from "./_components/layout/sidebar";
import { Header } from "./_components/layout/header";
import { Footer } from "./_components/layout/footer";

import * as contents from "@/contents";



const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_AUTO_CLOSE_KEY = "sidebar_autoclose";

export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const data = contents.app.item;
	const cookieStore = await cookies();
	const autoClose = cookieStore.get(SIDEBAR_AUTO_CLOSE_KEY)?.value === "true";
	const sidebarOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === "true";

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			enableColorScheme
			disableTransitionOnChange={false}
		>
			<TooltipProvider><BackButtonProvider><LayoutBreadcrumbProvider>
					<SidebarProvider defaultOpen={sidebarOpen}>
						<Sidebar
							items={contents.link.items}
							label="Navigation"
							variant="floating"
							autoClose={autoClose}
							autoCloseKey={SIDEBAR_AUTO_CLOSE_KEY}
							className="z-100"
						/>
						<div
							className="flex-1 flex flex-col z-10"
							style={{
								"--header-height": "4rem",
							} as React.CSSProperties}
						>
							<Header
								className={cn(
									"z-13 sticky top-0 flex items-center-safe gap-x-2 max-h-(--header-height) min-h-(--header-height)",
								)}
							>
								<SidebarTrigger className="size-8" icon={["PanelLeftClose", "PanelLeftOpen"]}/>
								<BackButton className="size-8"><Icon icon="ArrowLeft"/></BackButton>
								<p className="px-1 flex-1 text-lg font-semibold">
									KIM JOON HEE
								</p>
								<ModeToggle className="size-8"/>
							</Header>
							<main
								className={cn(
									"flex-1 z-11",
									"mx-auto max-w-384 w-full",
									"px-6 py-16 pb-20",
									"md:px-12 xl:px-16",
								)}
							>
								<LayoutBreadcrumb className="mb-4"/>
								{children}
							</main>
							<Footer className="z-12 text-sm text-center leading-12 text-muted-foreground">
								&copy; {data.releaseDate.getFullYear()} zuni.kim
							</Footer>
						</div>
					</SidebarProvider>
			</LayoutBreadcrumbProvider></BackButtonProvider></TooltipProvider>
		</ThemeProvider>
	);
}
