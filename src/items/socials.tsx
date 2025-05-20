import type { SocialItem } from "../layouts/Socials";

import contacts from "./contacts";



const socials: SocialItem[] = contacts.filter(x => x.icon === "GitHub");

export default socials;
