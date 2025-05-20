import { FaAngleLeft } from "@react-icons/all-files/fa/FaAngleLeft";
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import { IoIosClose } from "@react-icons/all-files/io/IoIosClose";
import { FaLink } from "@react-icons/all-files/fa/FaLink"
import { CgScrollV } from "@react-icons/all-files/cg/CgScrollV"

import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { SiGravatar } from "@react-icons/all-files/si/SiGravatar";



const icons = {
	Left: FaAngleLeft,
	Right: FaAngleRight,
	XMark: IoIosClose,
	Link: FaLink,
	Scroll: CgScrollV,

	GitHub: FaGithub,
	Instagram: FaInstagram,
	Gravatar: SiGravatar,
	Envelope: FaEnvelope,
};

export type IconName = keyof typeof icons;

export default icons;
