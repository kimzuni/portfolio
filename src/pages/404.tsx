import { SEO, Link, Button } from "../components";



export default function NotFound() {
	return (<>
		<SEO
			title="Not Found"
			url={{ pathname: "/" }}
		/>
		<div className="flex-1 flex flex-col gap-6 justify-center items-center text-lg font-semibold">
			<p>앗, 혹시 길을 잃으셨나요? 집으로 안내해 드릴게요!</p>
			<Button as={Link} to="/">저를 따라오세요!</Button>
		</div>
	</>);
}
