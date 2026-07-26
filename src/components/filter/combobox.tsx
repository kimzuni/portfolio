"use client";

import * as Base from "@/components/ui/combobox";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";

import type * as type from "./types";
import { FilterBox, ItemSize } from "./common";
import { SwitchBox, type SwitchBoxProps } from "./switch";



export interface ComboboxItem extends type.FilterItem<string> {
	chip?: string;
	description?: string | string[];
}

export interface ComboboxGroupItem<
	T extends ComboboxItem = ComboboxItem,
> extends type.FilterGroupItem<T> {
}



export interface ComboboxProps<
	Value extends ComboboxItem,
	Multiple extends boolean | undefined = false,
> extends Omit<React.ComponentProps<typeof Base.Combobox<Value, Multiple>>, "items" | "children"> {
	placeholder?: string;
	items: ComboboxGroupItem<Value>[] | Value[];
	enableGroupSize?: boolean;
	itemToStringChip?: type.ItemToString<Value>;
}

export function Combobox<
	Value extends ComboboxItem,
	Multiple extends boolean | undefined = false,
>({
	items,
	placeholder = "Search & Select...",
	enableGroupSize = false,
	isItemEqualToValue,
	itemToStringChip,
	itemToStringValue,
	itemToStringLabel,
	...props
}: ComboboxProps<Value, Multiple>) {
	const {
		multiple,
	} = props;

	const anchor = Base.useComboboxAnchor();

	const isEqual: type.ItemsToBoolean<Value> = (a, b) => (
		isItemEqualToValue?.(a, b)
		?? (
			(a.value !== undefined && a.value === b.value)
			|| (a.slug !== undefined && a.slug === b.slug)
		)
	);

	const getValue: type.ItemToString<Value> = (item) => itemToStringValue?.(item) || item.value || item.slug || "";

	const getLabel: type.ItemToString<Value> = (item) => itemToStringLabel?.(item) || item.label;

	const getChip: type.ItemToString<Value> = (item) => itemToStringChip?.(item) || item.chip || getLabel(item);

	return (
		<Base.Combobox
			autoHighlight
			items={items}
			isItemEqualToValue={isEqual}
			itemToStringValue={getValue}
			itemToStringLabel={getLabel}
			{...props}
		>
			{
				!multiple
					? (
						<Base.ComboboxInput placeholder={placeholder} showClear/>
					)
					: (
						<Base.ComboboxChips ref={anchor}>
							<Base.ComboboxValue>
								{(items: Value[]) => {
									if (!items.length) {
										return (
											<Base.ComboboxChipsInput placeholder={placeholder}/>
										);
									}

									return items.map(item =>
										<Base.ComboboxChip
											key={getValue(item)}
										>{getChip(item)}</Base.ComboboxChip>
									);
								}}
							</Base.ComboboxValue>
						</Base.ComboboxChips>
					)
			}
			<ComboboxContent
				anchor={multiple ? anchor : undefined}
				side="top"
				total={items.length}
				displayGroupSize={enableGroupSize}
				getValue={getValue}
				getLabel={getLabel}
			/>
		</Base.Combobox>
	);
}



interface ComboboxContentProps<
	Value extends ComboboxItem,
> extends Omit<React.ComponentProps<typeof Base.ComboboxContent>, "children"> {
	total: number;
	emptyLabel?: string;
	displayGroupSize: boolean;

	getValue: (item: Value) => string;
	getLabel: (item: Value) => string;
}

function ComboboxContent<
	Value extends ComboboxItem,
>({
	total,
	emptyLabel = "No items found.",
	displayGroupSize,
	getValue,
	getLabel,
	...props
}: ComboboxContentProps<Value>) {
	return (
		<Base.ComboboxContent {...props}>
			<Base.ComboboxEmpty>{emptyLabel}</Base.ComboboxEmpty>
			<Base.ComboboxList>
				{(groupOrItem: Value | type.FilterGroupItem<Value>, groupIdx: number) => {
					let group: type.FilterGroupItem<Value> | null = null;
					const Node = (item: Value) => (
						<Base.ComboboxItem value={item}>
							<Item size="xs" className="p-0">
								<ItemContent>
									<ItemTitle className="whitespace-nowrap gap-1">
										{getLabel(item)}
										<ItemSize size={item.size}/>
									</ItemTitle>
									<ItemDescription className="empty:hidden">
										{item.description}
									</ItemDescription>
								</ItemContent>
							</Item>
						</Base.ComboboxItem>
					);

					if (!("items" in groupOrItem)) {
						const item =groupOrItem;
						return <Node key={getValue(item)} {...item}/>;
					}

					group = groupOrItem;
					const sizes = !displayGroupSize ? [] : group.items;
					const size = !displayGroupSize ? undefined : sizes.reduce((a, b) => a + (b.size ?? 0), 0);
					return (
						<Base.ComboboxGroup key={group.label} items={group.items}>
							<Base.ComboboxLabel>
								{group.label}
								<ItemSize size={size}/>
							</Base.ComboboxLabel>
							<Base.ComboboxCollection>
								{(item: Value) => <Node key={getValue(item)} {...item}/>}
							</Base.ComboboxCollection>
							{groupIdx < total - 1 && <Base.ComboboxSeparator className="mx-0"/>}
						</Base.ComboboxGroup>
					);
				}}
			</Base.ComboboxList>
		</Base.ComboboxContent>
	)
}



export interface ComboboxBoxBox<
	Value extends ComboboxItem,
	Multiple extends boolean | undefined = false,
> extends ComboboxProps<Value, Multiple> {
	label?: string;
	enableSwitch?: boolean;
	switchProps?: SwitchBoxProps;
	children?: React.ReactNode;
}

export function ComboboxBox<
	Value extends ComboboxItem,
	Multiple extends boolean | undefined = false,
>({
	label,
	enableSwitch = false,
	switchProps,
	children,
	...props
}: ComboboxBoxBox<Value, Multiple>) {
	return (
		<FilterBox
			label={label}
			edge={enableSwitch || !switchProps ? children : <SwitchBox {...switchProps}/>}
		>
			<Combobox {...props}/>
		</FilterBox>
	);
}
