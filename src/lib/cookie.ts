export function set(key: string, value: string) {
	document.cookie = `${key}=${value}; path=/; SameSite=Lax`;
}
