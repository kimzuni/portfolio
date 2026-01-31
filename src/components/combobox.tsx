"use client";

import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from "./ui/combobox";



export interface ComboboxMultipleProps extends Omit<React.ComponentProps<typeof Combobox<string, true>>, "multiple"> {
	className?: string;
}

export function ComboboxMultiple(props: ComboboxMultipleProps) {
	const anchor = useComboboxAnchor();

	return (
		<Combobox
			multiple
			autoHighlight
			{...props}
		>
			<ComboboxChips ref={anchor}>
				<ComboboxValue>
					{(values: string[] | null) => (
						<>
							{values?.map(value => (
								<ComboboxChip
									key={value}
									children={value}
								/>
							))}
							<ComboboxChipsInput placeholder={values?.length ? "" : "Search & Select..."}/>
						</>
					)}
				</ComboboxValue>
			</ComboboxChips>
			<ComboboxContent anchor={anchor}>
				<ComboboxEmpty>No items found.</ComboboxEmpty>
				<ComboboxList className="">
					{(item: string) => (
						<ComboboxItem key={item} value={item}>
							{item}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
