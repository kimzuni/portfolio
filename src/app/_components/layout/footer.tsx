export interface FooterProps extends React.ComponentProps<"footer"> {
}

export function Footer(props: FooterProps) {
	return (
		<footer
			{...props}
		/>
	);
}
