import type { Item } from "..";

import home from "./home.png";
import blog from "./blog.png";
import mail from "./mail.png";



const item: Item = {
	title: "패밀리 사이트 (Jekyll)",
	date: [new Date("2023-01-12")],
	categories: ["Frontend", "Backend", "Jekyll"],
	skills: [
		{ label: "Ruby", color: "AE1401" },
		{ label: "Jekyll", color: "cc0000" },
		{ label: "Liquid", color: "3399cc" },
		{ label: "JavaScript", color: "f7df1e" },
		{ label: "Nodemailer", color: "29abe2" },
	],
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
			{
				service: "badge",
				badge: "visit-mail_service-5cc9ff",
				logo: undefined,
				link: "https://mail.kimzuni.com",
			},
		],
	},
	sections: [
		{
			images: [
				{
					src: home,
					alt: "Main Site",
				},
				{
					src: blog,
					alt: "Blog Main Page",
				},
			],
			description: [
				"Jekyll을 활용하여 테마부터 필요한 플러그인까지 직접 제작하였으며, GitHub Pages를 통해 배포한 개인 패밀리 사이트입니다.",
				"여러 사이트의 동일한 디자인으로, 사이트 간 이동이 자연스럽고 일관된 사용자 경험을 제공합니다.",
			],
		},
		{
			images: [
				{
					src: mail,
					alt: "mail",
				},
			],
			description: [
				"Nodemailer 기반의 익명 메일 서비스를 제공합니다. 수신인은 사용자가 직접 수정할 수 없으며, 철저한 보안 조치로 악의적인 행위를 방지합니다.",
				"상단에는 백엔드 상태를 실시간으로 표시하여 서비스 이용 가능 여부를 즉시 확인할 수 있도록 하였습니다.",
			],
		},
	],
};

export default item;
