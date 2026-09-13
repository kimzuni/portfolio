import { Input as BaseInput } from "@/components/ui/input";

import { FilterBox } from "./common";



export interface InputProps extends Omit<React.ComponentProps<typeof BaseInput>, "children"> {
}

export const Input = BaseInput;



export interface InputBoxProps extends InputProps {
	label?: string;
	children?: React.ReactNode;
}

export function InputBox({
	label,
	children,
	...props
}: InputBoxProps) {
	return (
		<FilterBox label={label} edge={children}>
			<Input {...props}/>
		</FilterBox>
	);
}
