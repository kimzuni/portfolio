import { Path, useLocation } from "react-router";
import { Helmet } from "react-helmet-async";

import { SEO as items } from "../items";



const BASE_URL = import.meta.env.VITE_BASE_URL;
const SITE_TITLE = import.meta.env.VITE_SITE_TITLE;

export interface SEOProps {
	title?: string;
	description?: string;
	keywords?: string | string[];
	url?: Partial<Path>;
	card?: "summary" | "summary_large_image" | "app" | "player";
	image?: string;
}

export default function SEO({
	title=items.title,
	description=items.description,
	keywords=[],
	url={},
	image=items.image,
	card=items.card,
}: SEOProps) {
	const SITE_NAME = "KIM JOON HEE's Web Portfolio";
	const { pathname } = useLocation();
	const pageURL = `${BASE_URL}${url.pathname ?? pathname}${url.search ?? ""}${url.hash ?? ""}`;
	title = `${SITE_TITLE} | ${title}`;
	keywords = [...new Set([...items.keywords].concat(Array.isArray(keywords) ? keywords : keywords.split(",").map(x => x.trim()).filter(Boolean)))];

	return (
		<Helmet>
			<title children={title}/>
			<link rel="canonical" href={pageURL}/>
			<meta name="application-name" content={SITE_NAME}/>
			<meta name="description" content={description}/>
			<meta name="keywords" content={keywords.join(",")}/>
			<meta name="author" content="KIM JOON HEE"/>
			<meta name="image" content={image}/>
			<meta property="og:url" content={pageURL}/>
			<meta property="og:site_name" content={SITE_NAME}/>
			<meta property="og:title" content={title}/>
			<meta property="og:description" content={description}/>
			<meta property="og:type" content="website"/>
			<meta property="og:image" content={image}/>
			<meta name="twitter:card" content={card}/>
			<meta name="twitter:url" content={pageURL}/>
			<meta name="twitter:title" content={title}/>
			<meta name="twitter:description" content={description}/>
			<meta name="twitter:image" content={image}/>
		</Helmet>
	);
}
