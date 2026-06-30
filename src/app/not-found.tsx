import Link from "next/link";



export default async function NotFound() {
	return (
		<div>
			Not Found
			<br/>
			<Link href="/">Go to Home</Link>
		</div>
	)
}
