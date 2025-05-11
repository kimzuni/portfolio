export interface UListItems<T> {
	items?: T[];
	render?: (item: T) => React.ReactNode;
}

export interface UListProps<T> extends Omit<React.ComponentPropsWithoutRef<"ul">, "children">, UListItems<T> {};



export default function UList<T>({
	items,
	render,
	...props
}: UListProps<T>) {
	if (!items || items.length === 0) return;

	return (
		<ul {...props}>
			{items.map((item, idx) => <li key={idx}>
				{render ? render(item) : String(item)}
			</li>)}
		</ul>
	);
}
