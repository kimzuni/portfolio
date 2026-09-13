export function set(key: string, value: string) {
	if (typeof document === "undefined") return;
	document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; SameSite=Lax`;
}

export function get(key: string) {
	return toJSON()[key];
}

export function toJSON(): Record<string, string> {
	if (typeof document === "undefined" || !document.cookie) {
		return {};
	}

	return Object.fromEntries(
		document.cookie
			.split("; ")
			.filter(Boolean)
			.map(item => {
				const [rawKey, ...rest] = item.split("=");
				return [
					decodeURIComponent(rawKey?.trim() ?? ""),
					decodeURIComponent(rest.join("=")),
				] as [string, string];
			})
			.filter(([key]) => Boolean(key))
	);
}
