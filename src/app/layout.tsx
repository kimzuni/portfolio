import type { Metadata } from "next";
import { Noto_Sans_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

import { nav } from "@/contents/nav";

import { Sidebar } from "./_components/layout/sidebar";
import { Header } from "./_components/layout/header";
import { Footer } from "./_components/layout/footer";

import "./styles/index.css";



const url = new URL("https://zuni.kim");

const title: Metadata["title"] = {
	template: "%s | kimzuni",
	default: "kimzuni | 웹 포트폴리오",
};

const description: Metadata["description"] = "kimzuni - 웹 포트폴리오";

export const metadata: Metadata = {
	title,
	description,
	keywords: ["kimzuni", "portfolio", "web portfolio", "김준희", "포트폴리오", "웹 포트폴리오"],
	metadataBase: url,
	alternates: {
		canonical: url,
	},
	openGraph: {
		url,
		title,
		description,
		type: "website",
		locale: "ko_KR",
		siteName: "kimzuni's Web Portfolio",
	},
};



const pretendard = localFont({
	src: "./fonts/PretendardVariable.woff2",
	display: "swap",
	weight: "45 920",
	variable: "--font-sans",
});

const notoSansMono = Noto_Sans_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="ko"
			data-scroll-behavior="smooth"
			suppressHydrationWarning
		>
			<body
				className={`${pretendard.variable} ${notoSansMono.variable} font-sans antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					enableColorScheme
					disableTransitionOnChange={false}
				>
					<SidebarProvider className="**:data-[slot=sidebar]:z-20" defaultOpen={false}>
						<Sidebar
							navGroups={nav}
							label="Navigation"
							variant="floating"
						/>
						<div
							className="flex-1 flex flex-col z-10"
							style={{
								"--header-height": "4rem",
							} as React.CSSProperties}
						>
							<Header className="z-13 sticky top-0 flex items-center-safe gap-x-3 max-h-(--header-height) min-h-(--header-height)">
								<SidebarTrigger/>
								<p
									className="flex-1 text-lg font-semibold"
									children="KIM JOON HEE"
								/>
								<ModeToggle
									variant="ghost"
									size="icon-sm"
									suppressHydrationWarning
								/>
							</Header>
							<main
								className="flex-1 z-11 relative"
								children={children}
							/>
							<Footer className="z-12 text-sm text-center leading-12 text-muted-foreground">
								&copy; {new Date().getFullYear()} zuni.kim
							</Footer>
						</div>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
