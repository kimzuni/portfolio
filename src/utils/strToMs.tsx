export default function strToMs(string: string | number) {
	if (!string) return 0;
	if (typeof string === "number") return string;
	if (string.endsWith("ms")) return parseFloat(string);
	if (string.endsWith("s")) return parseFloat(string) * 1000;
	return Number(string) || 0;
};
