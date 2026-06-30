export default async function AppLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			app layout
			<hr/>
			{children}
		</div>
	);
}
