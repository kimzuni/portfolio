import type { Metadata } from "next";
import { Noto_Sans_Mono } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import * as seo from "@/lib/seo";

import * as contents from "@/contents";

import "./styles/index.css";



const url = contents.app.item.url;
const title: Metadata["title"] = {
	default: contents.app.item.title,
	template: `%s | ${contents.app.item.title}`,
};
const description = contents.app.item.description.raw;



const pretendard = localFont({
	src: "../fonts/PretendardVariable.woff2",
	display: "swap",
	weight: "45 920",
	variable: "--font-sans",
});

const notoSansMono = Noto_Sans_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
});

export const metadata = seo.createMetadata({
	title,
	description,
	keywords: ["kimzuni", "portfolio", "web portfolio", "김준희", "포트폴리오", "웹 포트폴리오"],
	metadataBase: url,
	alternates: {
		canonical: url,
	},
	openGraph: {
		url,
		type: "website",
		locale: "ko_KR",
		siteName: "kimzuni's Web Portfolio",
	},
	twitter: {
		card: "summary_large_image",
	},
});



export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="ko"
			className={cn("h-full", "antialiased", "font-sans", pretendard.variable, notoSansMono.variable)}
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
