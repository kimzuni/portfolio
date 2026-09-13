import { cn } from "@/lib/utils";

import {
	type DropdownMenuItem,
	ActionCheckboxesMenu,
	type DropdownMenuCheckboxesItem,
	ActionRadioMenu,
	type ActionRadioMenuProps,
	ActionCheckboxGroupMenu,
	type ActionCheckboxGroupMenuProps,
} from "./dropdown-menu";
import { ActionToggle } from "./toggle";



export interface PresetActionReverseProps {
	reverse: boolean;
	onReverseChange: (reverse: boolean) => void;
}

export function PresetActionReverse({
	reverse,
	onReverseChange,
}: PresetActionReverseProps) {
	return (
		<ActionToggle
			variant="outline"
			icon="ArrowUpDown"
			title="Reverse order"
			aria-label="Reverse order"
			pressed={reverse}
			onPressedChange={onReverseChange}
			className={cn(
				"text-muted-foreground transition-colors",
				"bg-background aria-pressed:text-primary hover:bg-muted",
				"dark:bg-input/30 dark:hover:bg-input/50",
				"dark:aria-pressed:bg-input/50 dark:aria-pressed:hover:bg-input/50",
			)}
		/>
	);
}



export interface PresetActionViewItem extends Pick<DropdownMenuCheckboxesItem, "label" | "checked" | "onCheckedChange" | "disabled"> {
}

export interface PresetActionViewProps {
	items: PresetActionViewItem[];
}

export function PresetActionView({
	items,
}: PresetActionViewProps) {
	return (
		<ActionCheckboxesMenu
			icon="Eye"
			label="View"
			items={items}
			showCount
		/>
	);
}



export interface PresetActionSortByProps<
	Value extends DropdownMenuItem = DropdownMenuItem,
> extends Pick<ActionRadioMenuProps<Value>, "label" | "items" | "value" | "onValueChange" | "disabled"> {
}

export function PresetActionSortBy<
	Value extends DropdownMenuItem = DropdownMenuItem,
>(props: PresetActionSortByProps<Value>) {
	return (
		<ActionRadioMenu
			icon="ListFilter"
			label="Sort by"
			{...props}
		/>
	);
}



export interface PresetActionMultipleSortByProps<
	Value extends DropdownMenuItem = DropdownMenuItem,
> extends Pick<ActionCheckboxGroupMenuProps<Value>, "label" | "items" | "value" | "onValueChange" | "disabled"> {
}

export function PresetActionMultipleSortBy<
	Value extends DropdownMenuItem = DropdownMenuItem,
>(props: PresetActionMultipleSortByProps<Value>) {
	return (
		<ActionCheckboxGroupMenu
			icon="ListFilter"
			label="Sort by"
			showOrder
			showCount
			{...props}
		/>
	);
}
