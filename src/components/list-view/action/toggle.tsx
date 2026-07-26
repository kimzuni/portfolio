import { Toggle } from "@/components/ui/toggle";
import { Icon, type IconName } from "@/components/icon";



export interface ActionToggleProps extends Omit<React.ComponentProps<typeof Toggle>, "children"> {
	icon?: IconName;
	label?: string;
}

export function ActionToggle({
	icon = null,
	label,
	...props
}: ActionToggleProps) {
	return (
		<Toggle
			{...props}
		>
			<Icon icon={icon}/>
			{label}
		</Toggle>
	);
}
