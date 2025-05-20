import { Icons, IconName } from "../components";



export default function getIcon(icon: IconName) {
	const Elem = Icons[icon];
	return <Elem/>;
}
