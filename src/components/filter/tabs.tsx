"use client";

import type { TabsRootChangeEventDetails } from "@base-ui/react/tabs";

import * as Base from "@/components/ui/tabs";

import type * as type from "./types";
import { FilterBox, ItemSize } from "./common";



export interface TabsItem extends type.FilterItem {
}



interface BaseProps extends React.ComponentProps<typeof Base.Tabs> {
}

export interface TabsProps<
	Value extends TabsItem = TabsItem,
> extends BaseProps {
	items: Value[];
	value?: Value;
	defaultValue?: Value;
	variant?: React.ComponentProps<typeof Base.TabsList>["variant"];
	itemToStringValue?: type.ItemToString<Value>;
	itemToStringLabel?: type.ItemToString<Value>;
	onValueChange?: (value: Value, eventDetails: TabsRootChangeEventDetails) => void;
}

export function Tabs<
	Value extends TabsItem = TabsItem,
>({
	items,
	variant,
	itemToStringValue,
	itemToStringLabel,
	children,
	...props
}: TabsProps<Value>) {
	const getValue: type.ItemToString<Value, string | null> = (item) => itemToStringValue?.(item) || item.value || item.slug || null;

	const getLabel: type.ItemToString<Value> = (item) => itemToStringLabel?.(item) || item.label;

	return (
		<Base.Tabs
			{...props}
		>
			<Base.TabsList variant={variant}>
				{items.map((item) => (
					<Base.TabsTrigger
						key={getValue(item)}
						value={item}
						className="after:bg-primary"
					>
						{getLabel(item)}
						<ItemSize size={item.size}/>
					</Base.TabsTrigger>
				))}
			</Base.TabsList>
			{children}
		</Base.Tabs>
	);
}



export interface TabsContentProps extends React.ComponentProps<typeof Base.TabsContent> {}
export const TabsContent = Base.TabsContent;



export interface TabsBoxProps<
	Value extends TabsItem = TabsItem,
> extends TabsProps<Value> {
	label?: string;
	children?: React.ReactNode;
}

export function TabsBox<
	Value extends TabsItem = TabsItem,
>({
	label,
	children,
	...props
}: TabsBoxProps<Value>) {
	return (
		<FilterBox label={label} edge={children}>
			<Tabs {...props}/>
		</FilterBox>
	);
}
