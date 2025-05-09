import { forwardRef } from "react";



export type MenuBtnProps = React.ComponentPropsWithRef<"button">;



const MenuBtnBtn = forwardRef<HTMLButtonElement, MenuBtnProps>(({
	type="button",
	className="",
	...props
}, ref) => {
	return (
		<button
			ref={ref}
			type={type}
			className={`menuBtn ${className}`.trim()}
			{...props}
		>
			<div className="container">
				<span className="top"/>
				<span className="left"/>
				<span className="right"/>
				<span className="bottom"/>
			</div>
		</button>
	);
});

export default MenuBtnBtn;
