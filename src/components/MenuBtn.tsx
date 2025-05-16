import { forwardRef } from "react";



export interface MenuBtnProps extends React.ComponentPropsWithRef<"button"> {
	isOpen?: boolean;
};



const MenuBtn = forwardRef<HTMLButtonElement, MenuBtnProps>(({
	isOpen=false,
	className="",
	...props
}, ref) => {
	return (
		<button
			ref={ref}
			type="button"
			className={`menuBtn ${className}`.trim()}
			aria-expanded={isOpen}
			aria-label={"Toggle Menu"}
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

export default MenuBtn;
