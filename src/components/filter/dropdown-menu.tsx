"use client";

import { useControlled } from "@base-ui/utils/useControlled";
import { Checkbox } from '@base-ui/react/checkbox';
import { CheckboxGroup, type CheckboxGroupChangeEventDetails } from "@base-ui/react/checkbox-group";
import type { MenuRootChangeEventDetails } from "@base-ui/react";

import { cn } from "@/lib/utils";

import * as Base from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/icon";

import type * as type from "./types";
import { FilterBox } from "./common";



export interface DropdownMenuSeparatorProps extends React.ComponentProps<typeof Base.DropdownMenuSeparator> {}
export const DropdownMenuSeparator = Base.DropdownMenuSeparator;



export interface DropdownMenuItem<Slug extends string | null = string | null> extends type.FilterItem<Slug> {
	icon?: IconName;
}

export interface DropdownMenuGroupItem<
	T extends DropdownMenuItem = DropdownMenuItem,
> extends type.FilterGroupItem<T> {
}



export interface DropdownMenuTriggerProps extends React.ComponentProps<typeof Base.DropdownMenuTrigger> {
}

export interface DropdownMenuContentProps extends Omit<React.ComponentProps<typeof Base.DropdownMenuContent>, "children"> {
}

export interface DropdownMenuProps extends React.ComponentProps<typeof Base.DropdownMenu> {
	icon?: IconName;
	label?: React.ReactNode;

	contentProps?: DropdownMenuContentProps;
	triggerProps?: DropdownMenuTriggerProps;

	className?: string;
	children?: React.ReactNode;
}

export function DropdownMenu({
	icon = "ChevronDown",
	label,
	contentProps,
	triggerProps,
	className,
	children,
	...props
}: DropdownMenuProps) {
	return (
		<Base.DropdownMenu {...props}>
			<Base.DropdownMenuTrigger
				{...triggerProps}
				render={(
					<Button
						variant="outline"
						size={label ? "default" : "icon"}
						className={className}
					>
						{label}
						<Icon icon={icon}/>
					</Button>
				)}
			>
			</Base.DropdownMenuTrigger>
			<Base.DropdownMenuContent
				{...contentProps}
				className={cn(
					"**:data-[slot=dropdown-menu-label]:last:text-center",
					"**:data-[slot=dropdown-menu-label]:last:font-semibold",
					"**:data-[slot=dropdown-menu-label]:has-[+_:empty]:text-center",
					"**:data-[slot=dropdown-menu-label]:has-[+_:empty]:font-semibold",
					contentProps?.className,
				)}
			>
				{children}
			</Base.DropdownMenuContent>
		</Base.DropdownMenu>
	);
}



export interface DropdownMenuSubTriggerProps extends React.ComponentProps<typeof Base.DropdownMenuSubTrigger> {
}

export interface DropdownMenuSubContentProps extends Omit<React.ComponentProps<typeof Base.DropdownMenuSubContent>, "children"> {
}

export interface DropdownMenuSubProps extends React.ComponentProps<typeof Base.DropdownMenu> {
	icon?: IconName;
	label?: React.ReactNode;

	contentProps?: DropdownMenuSubContentProps;
	triggerProps?: DropdownMenuSubTriggerProps;

	children?: React.ReactNode;
}

export function DropdownMenuSub({
	label,
	contentProps,
	triggerProps,
	children,
	...props
}: DropdownMenuSubProps) {
	return (
		<Base.DropdownMenuSub {...props}>
			<Base.DropdownMenuSubTrigger {...triggerProps}>
				{label}
			</Base.DropdownMenuSubTrigger>
			<Base.DropdownMenuPortal>
				<Base.DropdownMenuSubContent {...contentProps}>
					{children}
				</Base.DropdownMenuSubContent>
			</Base.DropdownMenuPortal>
		</Base.DropdownMenuSub>
	);
}



export interface DropdownMenuGroupProps extends React.ComponentProps<typeof Base.DropdownMenuGroup> {
}

export const DropdownMenuGroup = Base.DropdownMenuGroup;



interface BaseRadioGroupProps extends React.ComponentProps<typeof Base.DropdownMenuRadioGroup> {
}

export interface DropdownMenuRadioGroupProps<
	Value extends DropdownMenuItem = DropdownMenuItem,
> {
	closeOnClick?: boolean;
	label?: string;
	items: Value[];
	value?: Value;
	defaultValue?: Value;
	onValueChange?: (value: Value, eventDetails: MenuRootChangeEventDetails) => void;
	itemToStringValue?: type.ItemToString<Value>;
	itemToStringLabel?: type.ItemToString<Value>;
	children?: React.ReactNode;
}

export function DropdownMenuRadioGroup<
	Value extends DropdownMenuItem = DropdownMenuItem,
>({
	closeOnClick = false,
	label,
	items,
	value: _value,
	defaultValue,
	onValueChange,
	itemToStringValue,
	itemToStringLabel,
	children,
}: DropdownMenuRadioGroupProps<Value>) {
	const [value, setValue] = useControlled({
		controlled: _value,
		default: defaultValue,
		name: "DropdownMenuRadioGroup",
		state: "value",
	});

	const getValue: type.ItemToString<Value> = (item) => itemToStringValue?.(item) || item.value || item.slug || "";

	const getLabel: type.ItemToString<Value> = (item) => itemToStringLabel?.(item) || item.label;



	const handleValueChange: BaseRadioGroupProps["onValueChange"] = (nextItem: Value, details) => {
		onValueChange?.(nextItem, details);

		if (details.isCanceled) {
			return;
		}

		setValue(nextItem);
	};

	return (
		<>
			<Base.DropdownMenuLabel className="empty:hidden">{label}</Base.DropdownMenuLabel>
			<Base.DropdownMenuRadioGroup
				value={value}
				onValueChange={handleValueChange}
			>
				{items.map(item => (
					<Base.DropdownMenuRadioItem
						key={getValue(item)}
						value={item}
						closeOnClick={closeOnClick}
					>
						<Icon icon={item.icon ?? null}/>
						{getLabel(item)}
					</Base.DropdownMenuRadioItem>
				))}
			</Base.DropdownMenuRadioGroup>
			{children}
		</>
	);
}



export interface DropdownMenuCheckboxesItem extends Omit<React.ComponentProps<typeof Base.DropdownMenuCheckboxItem>, "children"> {
	icon?: IconName;
	label: string;
}

export interface DropdownMenuCheckboxesProps {
	closeOnClick?: boolean;
	label?: string;
	items: DropdownMenuCheckboxesItem[];
	children?: React.ReactNode;
}

export function DropdownMenuCheckboxes({
	closeOnClick = false,
	label,
	items,
	children,
}: DropdownMenuCheckboxesProps) {
	return (
		<>
			<Base.DropdownMenuLabel className="empty:hidden">{label}</Base.DropdownMenuLabel>
			{items.map(({ icon, label, ...item }) => (
				<Base.DropdownMenuCheckboxItem
					key={label}
					closeOnClick={closeOnClick}
					{...item}
				>
					<Icon icon={icon ?? null}/>
					{label}
				</Base.DropdownMenuCheckboxItem>
			))}
			{children}
		</>
	);
}



export interface DropdownMenuCheckboxGroupProps<
	Value extends DropdownMenuItem = DropdownMenuItem,
> {
	closeOnClick?: boolean;
	label?: string;
	value?: Value[];
	items: Value[];
	defaultValue?: Value[];
	onValueChange?: (value: Value[], eventDetails: CheckboxGroupChangeEventDetails) => void;
	children?: React.ReactNode;

	/**
	 * check 아이콘 대신 선택한 순서 표시
	 */
	showOrder?: boolean;
}

export function DropdownMenuCheckboxGroup<
	Value extends DropdownMenuItem = DropdownMenuItem,
>({
	showOrder = false,
	closeOnClick = false,
	label,
	value: _value,
	items,
	defaultValue,
	onValueChange,
	children,
}: DropdownMenuCheckboxGroupProps<Value>) {
	const [value, setValue] = useControlled({
		controlled: _value,
		default: defaultValue,
		name: "DropdownMenuCheckboxGroup",
		state: "value",
	});

	const itemMap = new Map(items.map(item => [item.label, item]));

	const handleValueChange = (value: string[], details: CheckboxGroupChangeEventDetails) => {
		const nextItems = value.map(label => itemMap.get(label)).filter(x => x != undefined);
		setValue(nextItems);
		onValueChange?.(nextItems, details);
	};

	return (
		<>
			<Base.DropdownMenuLabel className="empty:hidden">{label}</Base.DropdownMenuLabel>
			<CheckboxGroup
				value={value.map(x => x.label)}
				onValueChange={handleValueChange}
			>
				{items.map(({ icon, label }) => (
					<Checkbox.Root
						key={label}
						value={label}
						name="name"
					>
						<Base.DropdownMenuCheckboxItem
							closeOnClick={closeOnClick}
							render={(
								<label>
									<Checkbox.Indicator className="pointer-events-none absolute right-2 flex items-center justify-center">
										{
											showOrder ? (
												<span className="font-semibold text-xs">{value.findIndex(x => x.label === label) + 1}</span>
											) : (
												<Icon icon="Check"/>
											)
										}
									</Checkbox.Indicator>
									<Icon icon={icon ?? null}/>
									{label}
								</label>
							)}
						/>
					</Checkbox.Root>
				))}
			</CheckboxGroup>
			{children}
		</>
	);
}



export interface DropdownMenuBoxBox extends DropdownMenuProps {
	label?: string;
	children?: React.ReactNode;
}

export function DropdownMenuBox({
	label,
	children,
	...props
}: DropdownMenuBoxBox) {
	return (
		<FilterBox
			label={label}
			edge={children}
		>
			<DropdownMenu {...props}/>
		</FilterBox>
	);
}
