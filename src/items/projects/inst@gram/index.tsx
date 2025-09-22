import type { Item } from "..";

import home from "./home.png";
import postOnHome from "./post-on-home.png";
import userProfile from "./user-profile.png";
import chatting from "./chatting.png";
import upload from "./upload.png";
import dbDiagram from "./db-diagram.png";



const item: Item = {
	title: "Inst@gram",
	date: [new Date("2023-03-02"), new Date("2023-06-20")],
	categories: ["Docker"],
	skills: [
		{ label: "Axios", color: "5A29E4" },
		{ label: "Node.js", color: "5FA04E" },
		{ label: "Express", color: "000000" },
		{ label: "MariaDB", color: "003545" },
		{ label: "Sass", color: "CC6699" },
		{ label: "Sequelize", color: "52B0E7" },
		{ label: "Socket.io", color: "010101" },
		{ label: "SQLite", color: "003B57" },
	],
	sections: [
		{
			media: [
				{
					src: dbDiagram,
					alt: "dbDiagram",
					loading: "eager",
					fetchPriority: "high",
				},
				{
					src: home,
					alt: "Home",
				},
				{
					src: postOnHome,
					alt: "Post",
				},
				{
					src: userProfile,
					alt: "Post",
				},
				{
					src: upload,
					alt: "Post",
				},
				{
					src: chatting,
					alt: "Post",
				},
			],
			descriptions: [
				"백엔드 중심의 첫 개인 프로젝트로, 인스타그램의 주요 기능을 일부 구현했습니다. 회원가입/로그인, 피드(사진/글) 업로드, 실시간 채팅, 팔로우, 댓글/답글, 좋아요 등의 기능을 지원하며, Socket.io를 활용해 채팅뿐 아니라 댓글과 좋아요 반응까지 실시간으로 업데이트되도록 구현했습니다.",
				"제3 정규형을 만족하는 데이터베이스를 설계하고, Axios를 활용해 백그라운드로 요청과 응답을 처리하여 사용자 경험을 향상시켰습니다. 파일 업로드 시에는 크기와 형식을 제한하고 파일명 충돌을 방지하는 로직을 적용해 보안성과 안전성을 강화했습니다.",
			],
		},
	],
};

export default item;
