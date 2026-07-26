"use client";

import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import {
	DropdownMenu,
	DropdownMenuGroup,
	type DropdownMenuGroupItem,
	DropdownMenuRadioGroup,
	type DropdownMenuRadioGroupProps,
	DropdownMenuCheckboxes,
	type DropdownMenuCheckboxesItem,
	type DropdownMenuCheckboxesProps,
	DropdownMenuCheckboxGroup,
	type DropdownMenuCheckboxGroupProps,
	DropdownMenuSeparator,
	type DropdownMenuProps,
	type DropdownMenuTriggerProps,
	type DropdownMenuContentProps,
	type DropdownMenuItem,
} from "@/components/filter/dropdown-menu";
import { Icon } from "@/components/icon";



export {
	type DropdownMenuItem,
	type DropdownMenuGroupItem,
	type DropdownMenuCheckboxesItem,

	DropdownMenuGroup,
	type DropdownMenuGroupProps,
	DropdownMenuRadioGroup,
	type DropdownMenuRadioGroupProps,
	DropdownMenuCheckboxes,
	type DropdownMenuCheckboxesProps,
	DropdownMenuCheckboxGroup,
	type DropdownMenuCheckboxGroupProps,
	DropdownMenuSeparator,
	type DropdownMenuSeparatorProps,
} from "@/components/filter/dropdown-menu";



export interface ActionDropdownMenuProps extends Omit<DropdownMenuTriggerProps, "value"> {
	icon?: DropdownMenuProps["icon"];
	label?: DropdownMenuProps["label"];
	contentProps?: DropdownMenuContentProps;
	children?: React.ReactNode;
}

export function ActionDropdownMenu({
	icon = null,
	label,
	contentProps,
	children,
	...props
}: ActionDropdownMenuProps) {
	return (
		<DropdownMenu
			modal={false}
			label={<>
				<Icon icon={icon} className="p-0.5"/>
				{label}
			</>}
			className="[&_svg]:last:rotate-x-0 data-popup-open:[&_svg]:last:rotate-x-180 [&_svg]:last:transition-all"
			contentProps={{
				side: "bottom",
				align: "end",
				...contentProps,
				className: cn(
					"w-fit",
					contentProps?.className,
				),
			}}
			triggerProps={props}
		>{children}</DropdownMenu>
	);
}



export interface ActionRadioMenuProps<
	Value extends DropdownMenuItem = DropdownMenuItem,
> extends ActionDropdownMenuProps, Omit<DropdownMenuRadioGroupProps<Value>, "items"> {
	label?: string;
	items: DropdownMenuGroupItem<Value>[] | Value[];
}

export function ActionRadioMenu<
	Value extends DropdownMenuItem = DropdownMenuItem,
>({
	closeOnClick,
	label,
	items,
	value,
	defaultValue,
	onValueChange,
	className,
	children,
	...props
}: ActionRadioMenuProps<Value>) {
	const [currValue, setCurrValue] = useState(value || defaultValue);

	const handleValueChange: typeof onValueChange = (...args) => {
		const [value] = args;
		setCurrValue(value);
		onValueChange?.(...args);
	};

	const groups = items[0] && "items" in items[0] ? items as DropdownMenuGroupItem<Value>[] : [{
		label: "",
		items: items as Value[],
	}];

	return (
		<ActionDropdownMenu
			data-value={currValue?.slug ?? currValue?.value}
			label={<span data-slot="label">{label}</span>}
			className={cn(
				"not-data-value:**:data-[slot=label]:opacity-50",
				className,
			)}
			{...props}
		>
			{groups.map((group, idx) => (
				<Fragment key={group.label || idx}>
					<DropdownMenuGroup>
						<DropdownMenuRadioGroup
							closeOnClick={closeOnClick}
							label={group.label}
							items={group.items}
							value={value}
							defaultValue={defaultValue}
							onValueChange={handleValueChange}
						>{children}</DropdownMenuRadioGroup>
					</DropdownMenuGroup>
					{idx < groups.length - 1 && (
						<DropdownMenuSeparator/>
					)}
				</Fragment>
			))}
		</ActionDropdownMenu>
	);
}



export interface ActionCheckboxesMenuProps extends ActionDropdownMenuProps, Omit<DropdownMenuCheckboxesProps, "items"> {
	showCount?: boolean;
	label?: string;
	items: DropdownMenuGroupItem<DropdownMenuCheckboxesItem>[] | DropdownMenuCheckboxesItem[];
}

export function ActionCheckboxesMenu({
	closeOnClick,
	showCount,
	label,
	items,
	children,
	...props
}: ActionCheckboxesMenuProps) {
	const groups = items[0] && "items" in items[0] ? items as DropdownMenuGroupItem<DropdownMenuCheckboxesItem>[] : [{
		label: "",
		items: items as DropdownMenuCheckboxesItem[],
	}];

	const count = groups.map(group => group.items.filter(x => x.checked)).flat().length;

	return (
		<ActionDropdownMenu
			label={!showCount ? label : <>
				{label}
				<span
					data-count={count}
					className="data-[count=0]:text-muted-foreground"
				>({count})</span>
			</>}
			{...props}
		>
			{groups.map((group, idx) => (
				<Fragment key={group.label || idx}>
					<DropdownMenuGroup>
						<DropdownMenuCheckboxes
							closeOnClick={closeOnClick}
							label={group.label}
							items={group.items}
						>{children}</DropdownMenuCheckboxes>
					</DropdownMenuGroup>
					{idx < groups.length - 1 && (
						<DropdownMenuSeparator/>
					)}
				</Fragment>
			))}
		</ActionDropdownMenu>
	);
}



export interface ActionCheckboxGroupMenuProps<
	Value extends DropdownMenuItem = DropdownMenuItem,
> extends ActionDropdownMenuProps, DropdownMenuCheckboxGroupProps<Value> {
	showCount?: boolean;
	label?: string;
}

export function ActionCheckboxGroupMenu<
	Value extends DropdownMenuItem = DropdownMenuItem,
>({
	closeOnClick,
	showOrder,
	showCount,
	label,
	value,
	items,
	defaultValue,
	onValueChange,
	children,
	...props
}: ActionCheckboxGroupMenuProps<Value>) {
	const [localCount, setLocalCount] = useState(0);
	const count = value?.length ?? localCount;

	const handleValueChange: typeof onValueChange = (...args) => {
		onValueChange?.(...args);

		const [value] = args;
		setLocalCount(value.length);
	}

	return (
		<ActionDropdownMenu
			label={!showCount ? label : <>
				{label}
				<span
					data-count={count}
					className="data-[count=0]:text-muted-foreground"
				>({count})</span>
			</>}
			{...props}
		>
			<DropdownMenuGroup>
				<DropdownMenuCheckboxGroup
					showOrder={showOrder}
					closeOnClick={closeOnClick}
					value={value}
					items={items}
					defaultValue={defaultValue}
					onValueChange={handleValueChange}
				>{children}</DropdownMenuCheckboxGroup>
			</DropdownMenuGroup>
		</ActionDropdownMenu>
	);
}
