export const date = (date: Date) => date.toLocaleDateString("ko", {
	year: "numeric",
	month: "numeric",
	day: "numeric",
});
