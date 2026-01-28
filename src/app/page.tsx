import { Link } from "@/components/link";



export default function Home() {
	return (
		<>
			Main page
			<br/>
			<Link href="/about">About</Link>
			<br/>
			<Link href="/projects">Projects</Link>
		</>
	);
}
