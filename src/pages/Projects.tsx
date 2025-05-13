import { Link, UList } from "../components";
import { items } from "../items/projects";



export default function Projects() {
	return (
		<div>
			<UList
				items={items}
				render={([id]) => <Link to={`/projects/${id}`}>{id}</Link>}
			/>
		</div>
	);
}
