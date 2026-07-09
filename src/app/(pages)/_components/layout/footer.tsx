export interface FooterProps extends React.ComponentProps<"footer"> {
}

export async function Footer(props: FooterProps) {
	return (
		<footer
			{...props}
		/>
	);
}
