import type { Badge } from "../components";



export type ShieldLinkURL = Exclude<keyof Badge, "badge">;

const urls: Record<ShieldLinkURL, string> = {
	"github": "https://github.com",
	"docker": "https://hub.docker.com/r",
};

export default urls;
