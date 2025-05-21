import fs from "fs";



const MOVE_FILES: Array<string[]> = [
	["404/index.html", "404.html"],
];

const BASE_URL_FILES: string[] = [
	"robots.txt",
	"sitemap.xml",
];

const REMOVE_FILES: string[] = [
	"404"
];



const BASE_URL = process.env.VITE_BASE_URL || "http://localhost:5173";

for (const file of BASE_URL_FILES) {
	const origin = fs.readFileSync(`dist/${file}`, "utf-8");
	const changed = origin.replace(/\{\{\s*BASE_URL\s*\}\}/g, BASE_URL);
	fs.writeFileSync(`dist/${file}`, changed);
}



for (const files of MOVE_FILES) {
	fs.renameSync(`dist/${files[0]}`, `dist/${files[1]}`);
}



for (const file of REMOVE_FILES) {
	fs.rmSync(`dist/${file}`, { recursive: true, force: true });
}
