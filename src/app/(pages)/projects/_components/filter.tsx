"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useSearchParamRouter } from "@/hooks/use-search-param-router";

import { Switch } from "@/components/ui/switch";
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

import { LinkButton } from "@/components/link-button";

import type { FilterItem } from "../page";



export interface ResetButtonProps extends React.ComponentProps<typeof LinkButton> {
}

export function ResetButton({
	...props
}: ResetButtonProps) {
	const router = useRouter();
	const pathname = usePathname();
	const disabled = !useSearchParams().size;

	const onClick = () => {
		if (!disabled) router.replace(pathname);
	};

	return (
		<LinkButton
			onClick={onClick}
			disabled={disabled}
			aria-disabled={disabled}
			{...props}
		/>
	);
}



interface SliderProps extends Omit<React.ComponentProps<typeof BaseSlider>, "onValueChange" | "onValueCommitted"> {
	label: string;
	min: number,
	max: number,
	value: [number, number],
	searchParamKey: string;
}

export function Slider({
	min,
	max,
	label,
	value,
	searchParamKey,
	...props
}: SliderProps) {
	const [localYears, setLocalYears] = useState(value);
	const { updateParams } = useSearchParamRouter();

	const onValueChange = (value: number | readonly number[]) => {
		const curr = value as [number, number];
		setLocalYears(curr);
	};

	const onValueCommitted = (value: number | readonly number[]) => {
		const curr = value as [number, number];
		
		const join = curr.join(",");
		const isDefault = join === [min, max].join(",");
		const nextValue = isDefault ? null : join;

		updateParams(searchParamKey, nextValue);
	};

	return (
		<>
			<div className="flex items-center justify-between gap-2">
				<span>{label}</span>
				<span className="text-muted-foreground text-sm">{localYears.join(" ~ ")}</span>
			</div>
			<BaseSlider
				className="pt-1 pb-2"
				step={1}
				min={min}
				max={max}
				value={localYears}
				onValueChange={onValueChange}
				onValueCommitted={onValueCommitted}
				{...props}
			/>
		</>
	);
}



export interface FilterGroupItem {
	value: string;
	items: FilterItem[];
}

interface SwitchProps extends Omit<React.ComponentProps<typeof Switch>, "checked" | "onCheckedChange"> {
	label: string;
	checked: boolean;
	searchParamKey: string;
}

interface ComboboxMultipleProps<V> extends Omit<React.ComponentProps<typeof Combobox<V, true>>, "multiple" | "items"> {
	label: string;
	items: Array<FilterGroupItem | FilterItem>;
	searchParamKey: string;
	switchProps: SwitchProps;
}

export function ComboboxMultiple<V extends string>({
	label,
	searchParamKey,
	items,
	value,
	switchProps: {
		label: switchLabel,
		searchParamKey: switchKey,
		checked: switchChecked,
		...switchProps
	},
	...props
}: ComboboxMultipleProps<V>) {
	const anchor = useComboboxAnchor();
	const { updateParams } = useSearchParamRouter();

	const mapByLabel = items.reduce<Record<string, FilterItem>>((acc, cur) => {
		if ("slug" in cur) {
			acc[cur.label] = cur;
		} else {
			for (const item of cur.items) {
				acc[item.label] = item;
			}
		}
		return acc;
	}, {});

	const onSwitchCheckedChange = (key: string, checked: boolean) => {
		updateParams(key, checked ? "true" : undefined);
	};

	const onValueChange = (key: string, value: V[]) => {
		const items = value.map(x => mapByLabel[x]?.slug).filter(x => x !== undefined);
		updateParams(key, items.length ? items.join(",") : undefined);
	};

	return (
		<>
			<div className="flex items-center justify-between gap-2">
				<span>{label}</span>
				<Field orientation="horizontal" className="w-fit gap-2">
					<FieldLabel className="text-muted-foreground text-sm">{switchLabel}</FieldLabel>
					<Switch
						size="sm"
						onCheckedChange={value => onSwitchCheckedChange(switchKey, value)}
						checked={switchChecked}
						{...switchProps}
					/>
				</Field>
			</div>
			<Combobox
				multiple
				autoHighlight
				items={items}
				value={value}
				onValueChange={(value) => onValueChange(searchParamKey, value)}
				{...props}
			>
				<ComboboxChips ref={anchor}>
					<ComboboxValue>
						{value?.map(x => {
							const item = mapByLabel[x];
							if (!item) return null;

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
							const Node = ({ label, description }: FilterItem) => (
								<ComboboxItem value={label}>
									<Item size="xs" className="p-0">
										<ItemContent>
											<ItemTitle className="whitespace-nowrap">
												{label}
											</ItemTitle>
											<ItemDescription className="empty:hidden">
												{description?.lines?.join(" ")}
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
		</>
	);
}
