import type { ProjectContent } from "../";

import home from "./home.png";
import postOnHome from "./post-on-home.png";
import userProfile from "./user-profile.png";
import upload from "./upload.png";
import dbDiagram from "./db-diagram.png";

const chatting = "/videos/inst@gram-chatting.webm";



export default {
	cover: dbDiagram,
	title: "Inst@gram",
	description: [
		"인스타그램의 핵심 기능을 일부 구현한 백엔드 중심 프로젝트입니다.",
		"데이터 무결성을 확보하기 위해 제3정규형(3NF)을 준수하여 데이터베이스를 설계하였습니다.",
	],
	period: [
		new Date("2023-03-02"),
		new Date("2023-06-20"),
	],
	tags: [
		"Frontend",
		"Backend",
	],
	skills: [
		"JavaScript",
		"Node.js",
		"Express",
		"Sequelize",
		"WebSocket",
	],
	sections: [
		{
			blocks: [
				{
					media: {
						type: "image",
						src: dbDiagram,
						alt: "데이터베이스 다이어그램",
					},
				},
				{
					text: [
						"인스타그램의 주요 기능인 로그인, 피드(사진/글) 업로드, 실시간 채팅, 팔로우, 댓글/답글, 좋아요 등의 기능을 구현하였습니다.",
						"Socket.io를 활용해 채팅뿐 아니라 댓글과 좋아요 반응까지 실시간으로 업데이트되도록 하였습니다.",
						"",
						"Sequelize를 활용해 데이터베이스를 관리하며, 파일 업로드 시 크기와 형식을 제한하고 파일명 충돌을 방지하는 로직을 적용해 보안성과 안전성을 강화했습니다.",
						"또한 Axios를 활용해 비동기 통신을 구현하여 사용자 경험을 개선하였습니다.",
					],
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
					text: [
						"메인 페이지에서는 나와 내가 팔로우한 사용자의 게시글만 볼 수 있습니다.",
					],
				},
				{
					media: {
						type: "image",
						src: postOnHome,
						alt: "게시글 (modal)",
					},
					text: [
						"게시글에서는 댓글과 답글을 작성하고, 이에 대한 좋아요를 표시할 수 있습니다.",
					],
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
					text: [
						"게시글 작성 시 사진을 직접 선택하거나 drag & drop을 통해 사진을 업로드할 수 있습니다.",
					],
				},
				{
					media: {
						type: "image",
						src: userProfile,
						alt: "유저 프로필 페이지",
					},
					text: [
						"프로필 페이지에서는 해당 사용자가 작성한 게시글, 팔로워, 팔로잉 수를 볼 수 있습니다.",
					],
				},
			],
		},
		{
			blocks: [
				{
					media: {
						type: "video",
						src: chatting,
					},
					text: [
						"사용자의 팔로워 및 팔로잉 수를 클릭하면 그 목록을 볼 수 있으며,",
						"Message 버튼을 통해 새로운 채팅방을 생성하거나 사용자와의 채팅방으로 이동하여 실시간 채팅을 할 수 있습니다.",
					],
				},
			],
		},
	],
} satisfies ProjectContent;
