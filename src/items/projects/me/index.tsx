import { Shield } from "../../../components";

import type { Item } from "..";

import jekyllHome from "./jekyll-home.png";
import jekyllBlog from "./jekyll-blog.png";
import jekyllMail from "./jekyll-mail.png";

import vitepressBlogHome from "./vitepress-blog-home.png";
import vitepressBlogPosts from "./vitepress-blog-posts.png";
import vitepressBlogArchives from "./vitepress-blog-archives.png";



const item: Item = {
	title: "개인 브랜딩 프로젝트",
	date: [new Date("2023-01-12")],
	categories: ["Frontend", "Backend", "Jekyll"],
	cover: vitepressBlogHome,
	badges: {
		user: "kimzuni",
		repo: "blog",
		logo: "github",
		items: [
			{
				service: "github",
				badge: "lastCommit",
				link: true,
			},
		],
	},
	sections: [
		{
			descriptions: [
				<p className="text-center">나를 브랜딩하기 위해 시작된 개인 프로젝트로, 끝없이 업데이트됩니다.</p>,
			],
		},
		{
			descriptions: [
				<div className="mt-16 flex flex-col gap-3 text-center">
					<h3 className="text-xl">with Jekyll</h3>
					<div>2023-01-12 ~ 2024-11-02</div>
					<div className="flex flex-wrap justify-center-safe gap-2">
						<Shield service="badge" badge="visit-mail_service-5cc9ff" link="https://mail.kimzuni.com"/>
					</div>
					<div className="flex flex-wrap justify-center-safe gap-2">
						<Shield service="badge" badge="Jekyll-cc0000" logo="jekyll"/>
						<Shield service="badge" badge="Liquid-3399cc"/>
						<Shield service="badge" badge="Node.js-5FA04E" logo="Node.js" logoColor="white"/>
						<Shield service="badge" badge="Nodemailer-29abe2"/>
						<Shield service="badge" badge="Ruby-AE1401" logo="ruby"/>
					</div>
				</div>,
			],
		},
		{
			reverse: false,
			media: [
				{
					src: jekyllHome,
					alt: "Main Site with Jekyll",
					loading: "eager",
					fetchPriority: "high",
				},
				{
					src: jekyllBlog,
					alt: "Main Page of the Blog with Jekyll",
				},
				{
					src: jekyllMail,
					alt: "Mail Service with Jekyll",
				},
			],
			descriptions: [
				"Jekyll을 활용해 테마와 일부 필요한 플러그인을 직접 구현했으며, 사이트에 동일한 디자인을 적용해 사이트 간 이동이 자연스럽고 일관된 사용자 경험을 제공합니다. 블로그 댓글은 Giscus를 통해 제공되며, 사이트와 자연스럽게 어우러지도록 커스텀 CSS를 적용했습니다.",
				"Nodemailer 기반의 익명 메일 서비스를 제공하며, 실시간으로 표시되는 상단의 백엔드 상태를 통해 서비스 이용 가능 여부를 즉시 확인할 수 있습니다. 수신인은 사용자가 직접 수정할 수 없으며, 철저한 보안 조치로 악의적인 행위를 방지합니다.",
			],
		},
		{
			descriptions: [
				<div className="mt-16 flex flex-col gap-3 text-center">
					<h3 className="text-xl">with Vitepress</h3>
					<div>2025-05-27 ~ 2025.07.03</div>
					<div className="flex flex-wrap justify-center-safe gap-2">
						<Shield service="badge" badge="visit-Zuniverse-5cc9ff" link="https://blog.kimzuni.com"/>
					</div>
					<div className="flex flex-wrap justify-center-safe gap-2">
						<Shield service="badge" badge="Bun-000000" logo="Bun" logoColor="white"/>
						<Shield service="badge" badge="TypeScript-3178C6" logo="TypeScript" logoColor="white"/>
						<Shield service="badge" badge="VitePress-5C73E7" logo="VitePress" logoColor="white"/>
						<Shield service="badge" badge="Vue.js-4FC08D" logo="Vue.js" logoColor="white"/>
						<Shield service="badge" badge="TailwindCSS-38bdf8" logo="TailwindCSS" logoColor="white"/>
						<Shield service="badge" badge="markdown--it-000000" logo="Markdown" logoColor="white"/>
					</div>
				</div>,
			],
		},
		{
			reverse: true,
			media: [
				{
					src: vitepressBlogHome,
					alt: "Main Page of the Blog with VitePress",
				},
				{
					src: vitepressBlogPosts,
					alt: "Posts List Page of Blog with VitePress",
				},
				{
					src: vitepressBlogArchives,
					alt: "Archives Page of Blog with VitePress",
				},
			],
			descriptions: [
				"문서용으로 설계된 VitePress에 Components, Composables, Config 등 다양한 커스터마이징을 적용해 블로그에 적합하도록 기능과 UI를 확장했습니다. 댓글은 Giscus를 통해 제공되며, VitePress 테마와 자연스럽게 어우러지도록 커스텀 CSS를 적용했습니다.",
				"포스트를 작성하거나 이벤트를 등록하면 아카이브 페이지에 자동으로 반영되어 블로그 전반의 흐름과 히스토리를 직관적으로 확인할 수 있습니다.",
			],
		},
	],
};

export default item;
