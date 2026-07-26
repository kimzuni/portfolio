"use client";

import { useState } from "react";
import { useControlled } from "@base-ui/utils/useControlled";
import type { SliderRootCommitEventDetails } from "@base-ui/react";

import { cn } from "@/lib/utils";

import * as Base from "@/components/ui/slider";

import { FilterBox } from "./common";



interface BaseProps extends React.ComponentProps<typeof Base.Slider> {
}



export interface SliderProps extends Omit<BaseProps, "onValueChange" | "onValueCommitted" | "children"> {
	min: number;
	max: number;
	value?: [number, number];
	defaultValue?: [number, number];
	enableLocalValue?: boolean;
	onValueChange?: (value: [number, number], eventDetails: SliderRootCommitEventDetails) => void;
	onValueCommitted?: (value: [number, number], eventDetails: SliderRootCommitEventDetails) => void;
}

export function Slider({
	value: _value,
	defaultValue,
	enableLocalValue = true,
	onValueChange,
	onValueCommitted,
	className,
	...props
}: SliderProps) {
	const [value, setValue] = useControlled({
		controlled: _value,
		default: defaultValue,
		name: "Slider",
		state: "value",
	});

	const [prevValue, setPrevValue] = useState(value);
	const [localValue, setLocalValue] = useState(value);
	if (value !== prevValue) {
		setPrevValue(value);
		setLocalValue(value);
	}

	const handleValueChange: BaseProps["onValueChange"] = (...args) => {
		const nextValue = args[0] as [number, number];
		const details = args[1];
		onValueChange?.(nextValue, details);

		if (details.isCanceled) {
			return;
		}

		setValue(nextValue);
		if (enableLocalValue) {
			setLocalValue(nextValue);
		}
	};

	const handleValueCommited: BaseProps["onValueCommitted"] = (...args) => {
		const nextValue = args[0] as [number, number];
		const details = args[1];
		onValueCommitted?.(nextValue, details);
	};

	return (
		<Base.Slider
			className={cn(
				"pt-1 pb-2",
				className,
			)}
			step={1}
			value={localValue}
			thumbCollisionBehavior="swap"
			onValueChange={handleValueChange}
			onValueCommitted={handleValueCommited}
			thumb-aria-labels={["Minimum", "Maximum"]}
			{...props}
		/>
	);
}



export interface SliderBoxProps extends SliderProps {
	label?: string;
	displayValue?: boolean;
	children?: React.ReactNode;
}

export function SliderBox({
	label,
	displayValue = true,
	onValueChange,
	children,
	...props
}: SliderBoxProps) {
	const {
		min,
		max,
		value,
		defaultValue,
	} = props;

	const initValue = value ?? defaultValue ?? [min, max];
	const [prevRange, setPrevRange] = useState(initValue);
	const [range, setRange] = useState(initValue);
	if (initValue !== prevRange) {
		setPrevRange(initValue);
		setRange(initValue);
	}

	const handleValueChange: SliderProps["onValueChange"] = (...args) => {
		const [nextValue] = args;
		setRange(nextValue);
		onValueChange?.(...args);
	}

	return (
		<FilterBox label={label} edge={displayValue && range ? range.join(" ~ ") : children}>
			<Slider
				onValueChange={handleValueChange}
				{...props}
			/>
		</FilterBox>
	);
}
