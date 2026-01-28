import type { Metadata } from "next";
import { Noto_Sans_Mono } from "next/font/google";
import localFont from "next/font/local";

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
		>
			<body
				className={`${pretendard.variable} ${notoSansMono.variable} font-sans antialiased`}
			>
				<header>
					Header
				</header>
				<hr/>
				<nav>
					Nav
				</nav>
				<hr/>
				<main>
					{children}
				</main>
				<hr/>
				<footer>
					Footer
				</footer>
			</body>
		</html>
	);
}
