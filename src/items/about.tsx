import type { AboutItem } from "../pages/Home/About";



const date = new Date();
const birthString = ["1999", "06", "23"];
const birthNumber = birthString.map(x => Number(x));
const age1 = date.getFullYear() - birthNumber[0] + 1;
const age2 = age1 - (date.getMonth()+1 < birthNumber[1] || (date.getMonth()+1 == birthNumber[1] && date.getDate() < birthNumber[2]) ? 1 : 0);

const items: AboutItem[] = [
	{
		title: "WHO AM I?",
		items: [
			{
				th: "이름",
				td: "김준희",
			},
			{
				th: "나이",
				td: `${birthString.join(".")}. ${age1}세(만 ${age2})`,
			},
			{
				th: "학력",
				td: <>
					영남이공대학교 (사이버보안과/전문학사)<br/>
					경북기계공업고등학교 (마이스터6기/중퇴)<br/>
				</>,
			},
			{
				th: "자격증",
				td: <>
					리눅스마스터 2급<br/>
					네트워크관리사 2급<br/>
				</>,
			},
		],
	},
	{
		title: "WHO AM I?",
		items: [
			{
				th: "수상",
				td: <>
					전국 창의코딩 경진대회 금상 (2023)<br/>
					교내 창의코딩 경진대회 대상 (2023)<br/>
				</>,
			},
		],
	},
];

export default items;
