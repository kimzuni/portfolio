import * as Base from "@/components/ui/switch";
import { Label } from "@/components/ui/label";



export interface SwitchProps extends React.ComponentProps<typeof Base.Switch> {
}

export function Switch({
	...props
}: SwitchProps) {
	return (
		<Base.Switch
			size="sm"
			{...props}
		/>
	);
}



export interface SwitchBoxProps extends SwitchProps {
	label?: string;
}

export function SwitchBox({
	label,
	...props
}: SwitchBoxProps) {
	return (
		<Label className="w-full flex gap-2 items-center-safe justify-between text-base">
			{label}
			<Switch {...props}/>
		</Label>
	);
}
