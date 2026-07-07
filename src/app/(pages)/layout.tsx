import { cookies } from "next/headers";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";

import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

import { Sidebar } from "./_components/layout/sidebar";
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
	const sidebarOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value !== "false";

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			enableColorScheme
			disableTransitionOnChange={false}
		>
			<TooltipProvider>
				<SidebarProvider defaultOpen={sidebarOpen}>
					<Sidebar
						items={contents.link.items}
						label="Navigation"
						variant="floating"
						autoClose={autoClose}
						autoCloseKey={SIDEBAR_AUTO_CLOSE_KEY}
					/>
					<div
						className="flex-1 flex flex-col z-10"
						style={{
							"--header-height": "4rem",
						} as React.CSSProperties}
					>
						<Header
							className={cn(
								"z-13 sticky top-0 flex items-center-safe gap-x-3 max-h-(--header-height) min-h-(--header-height)",
							)}
						>
							<SidebarTrigger/>
							<p className="flex-1 text-lg font-semibold">
								KIM JOON HEE
							</p>
							<ModeToggle/>
						</Header>
						<main className="flex-1 z-11 relative">
							{children}
						</main>
						<Footer className="z-12 text-sm text-center leading-12 text-muted-foreground">
							&copy; {data.buildTime.getFullYear()} zuni.kim
						</Footer>
					</div>
				</SidebarProvider>
			</TooltipProvider>
		</ThemeProvider>
	);
}
