import type { ItemRaw } from "../types";

import dbDiagram from "./db-diagram.png";
import home from "./home.png";
import postOnHome from "./post-on-home.png";
import userProfile from "./user-profile.png";
import upload from "./upload.png";

const chatting = "chatting.webm";



export const item: ItemRaw = {
	cover: dbDiagram,
	name: "Inst@gram",
	description: `
		인스타그램의 주요 기능을 일부 구현한 백엔드 중심의 프로젝트입니다.
		자유 주제로 진행한 개인 프로젝트 과제로 제출한 결과물입니다.
	`,
	highlights: [
		{
			label: "Database Design",
			value: "Sequelize를 활용한 제3정규형(3NF) 준수 데이터베이스 설계 및 관리",
		},
		{
			label: "File Upload Security",
			value: "파일 업로드 시 크기, 형식 제한 및 파일명 충돌 방지 로직 적용",
		},
		{
			label: "Real-Time Chat",
			value: "웹 소켓을 활용한 실시간 채팅과 댓글/좋아요 반응 구현",
		},
		{
			label: "Asynchronous Communication",
			value: "Axios를 활용한 비동기 통신 구현",
		},
	],
	period: [
		new Date("2023-03-02"),
		new Date("2023-06-20"),
	],
	tags: [
		"frontend",
		"backend",
		"toy-project",
	],
	skills: {
		primary: [
			"html",
			"css",
			"javascript",
			"node-js",
			"express-js",
			"sequelize",
			"websocket",
		],
		secondary: [
			"mariadb",
			"sqlite",
		],
	},
	links: [
		{
			label: "GitHub",
			href: "https://github.com/jh1950/instagram-backend",
		},
	],
	articles: [
		{
			maxWidth: 850,
			blocks: [
				{
					media: {
						type: "image",
						src: dbDiagram,
						alt: "데이터베이스 다이어그램",
						caption: "DBEaver로 조회한 데이터베이스 다이어그램",
					},
					text: `
						데이터베이스는 제3정규형(3NF)을 준수하여 설계하였으며,
						유저 테이블을 기준으로, 게시글, 댓글, 좋아요, 팔로우, 채팅방, 채팅 메시지 등의 주요 기능을 구현하기 위해 필요한 테이블들을 설계하였습니다.
						Sequelize(ORM)을 사용하여 테이블을 모델로서 정의 및 관리하고, 테이블간 관계를 설정하여 데이터베이스를 효율적으로 관리할 수 있도록 하였습니다.
					`,
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: home,
						alt: "홈 화면",
					},
					text: `
						메인 페이지에서는 나와 내가 팔로우한 사용자의 게시글만 볼 수 있습니다.
					`,
				},
				{
					media: {
						type: "image",
						src: postOnHome,
						alt: "게시글 (modal)",
					},
					text: `
						게시글에서는 댓글과 답글을 작성하고, 이에 대한 좋아요를 표시할 수 있습니다.
						웹 소켓을 활용하여 댓글과 좋아요 반응을 실시간으로 업데이트합니다.
					`,
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "image",
						src: upload,
						alt: "게시글 작성 페이지",
					},
					text: `
						게시글 작성 시 사진을 직접 선택하거나 Drag & Drop을 통해 사진을 업로드할 수 있습니다.
						파일 업로드 시 파일 크기와 형식을 제한하고,
						파일명 충돌을 방지하는 로직을 적용하여 보안성과 안전성을 강화했습니다.
					`,
				},
				{
					media: {
						type: "image",
						src: userProfile,
						alt: "유저 프로필 페이지",
					},
					text: `
						프로필 페이지에서는 해당 사용자가 작성한 게시글, 팔로워, 팔로잉 수를 볼 수 있습니다.
					`,
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "video",
						src: chatting,
						caption: "홈에서부터 채팅방으로 이동하여 실시간 채팅을 하는 모습",
					},
					text: `
						사용자의 팔로워 및 팔로잉 수를 클릭하면 해당 목록을 볼 수 있으며,
						Message 버튼을 통해 새로운 채팅방을 생성하거나 사용자와의 채팅방으로 이동하여 실시간 채팅을 할 수 있습니다.
					`,
				},
			],
		},
	],
};
