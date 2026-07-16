"use client";

import type { TabsRootChangeEventDetails } from "@base-ui/react/tabs";

import { cn } from "@/lib/utils";
import { useSearchParamRouter } from "@/hooks/use-search-param-router";

import { Switch as BaseSwitch } from "@/components/ui/switch";
import { Slider as BaseSlider } from "@/components/ui/slider";
import { Field, FieldLabel } from "@/components/ui/field";
import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxLabel,
	ComboboxCollection,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from "@/components/ui/combobox";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "@/components/ui/item";
import {
	Tabs as BaseTabs,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { LinkButton } from "@/components/link-button";

import type { ItemMetadata } from "../page";



export interface FilterItem extends ItemMetadata {
}



export interface ResetButtonProps extends React.ComponentProps<typeof LinkButton> {
}

export function ResetButton({
	...props
}: ResetButtonProps) {
	const { searchParams, resetParams } = useSearchParamRouter({
		engine: "native",
		type: "replace",
	});
	const disabled = !searchParams.size;

	const onClick = () => {
		if (!disabled) resetParams();
	};

	return (
		<LinkButton
			onClick={onClick}
			disabled={disabled}
			{...props}
		/>
	);
}



interface BaseTabsProps extends React.ComponentProps<typeof BaseTabs> {
}
export interface TabsProps extends Omit<BaseTabsProps, "onValueChange"> {
	variant?: React.ComponentProps<typeof TabsList>["variant"];
	onValueChange?: (value: FilterItem, eventDetails: TabsRootChangeEventDetails) => void;
	items: FilterItem[];
}

export function Tabs({
	items,
	variant,
	...props
}: TabsProps) {
	return (
		<BaseTabs {...props}>
			<TabsList variant={variant}>
				{items.map(item => (
					<TabsTrigger
						key={item.slug}
						value={item}
					>{item.label}</TabsTrigger>
				))}
			</TabsList>
		</BaseTabs>
	);
}



export interface SliderProps extends React.ComponentProps<typeof BaseSlider> {
	min: number,
	max: number,
	value: [number, number],
}

export function Slider({
	className,
	...props
}: SliderProps) {
	return (
		<BaseSlider
			className={cn(
				"pt-1 pb-2",
				className,
			)}
			step={1}
			thumbCollisionBehavior="swap"
			{...props}
		/>
	);
}



export interface SwitchProps extends React.ComponentProps<typeof BaseSwitch> {
	label: string;
	checked: boolean;
}

export function Switch({
	label,
	...props
}: SwitchProps) {
	return (
		<Field orientation="horizontal" className="w-fit gap-2">
			<FieldLabel className="text-muted-foreground text-sm">{label}</FieldLabel>
			<BaseSwitch
				size="sm"
				{...props}
			/>
		</Field>
		);
}



export interface FilterGroupItem {
	value: string;
	items: FilterItem[];
}

export interface ComboboxMultipleProps<V extends FilterItem> extends Omit<React.ComponentProps<typeof Combobox<V, true>>, "multiple" | "items"> {
	items: Array<FilterGroupItem | FilterItem>;
}

export function ComboboxMultiple<V extends FilterItem>({
	items,
	value,
	...props
}: ComboboxMultipleProps<V>) {
	const anchor = useComboboxAnchor();

	return (
		<Combobox
			multiple
			autoHighlight
			items={items}
			value={value}
			isItemEqualToValue={(a, b) => a.slug === b.slug}
			{...props}
		>
			<ComboboxChips ref={anchor}>
				<ComboboxValue>
					{value?.map(item => {
						const { slug, label } = item;
						return <ComboboxChip key={slug}>{label}</ComboboxChip>;
					})}
					<ComboboxChipsInput placeholder={value?.length ? "" : "Search & Select..."}/>
				</ComboboxValue>
			</ComboboxChips>
			<ComboboxContent anchor={anchor}>
				<ComboboxEmpty>No items found.</ComboboxEmpty>
				<ComboboxList>
					{(groupOrItem: typeof items[number]) => {
						const Node = (item: FilterItem) => (
							<ComboboxItem value={item}>
								<Item size="xs" className="p-0">
									<ItemContent>
										<ItemTitle className="whitespace-nowrap">
											{item.label}
										</ItemTitle>
										<ItemDescription className="empty:hidden">
											{item.description?.lines?.join(" ")}
										</ItemDescription>
									</ItemContent>
								</Item>
							</ComboboxItem>
						);

						if ("slug" in groupOrItem) {
							return <Node key={groupOrItem.slug} {...groupOrItem}/>;
						}

						const group = groupOrItem
						return (
							<ComboboxGroup key={group.value} items={group.items}>
								<ComboboxLabel>{group.value}</ComboboxLabel>
								<ComboboxCollection>
									{(item: FilterItem) => <Node key={item.slug} {...item}/>}
								</ComboboxCollection>
							</ComboboxGroup>
						);
					}}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
