import { useRender, mergeProps } from "@base-ui/react";

import { Time, type TimeProps, type TimeValue } from "@/components/time";



export type { TimeValue };

export type Period<T extends TimeValue = TimeValue> = [start: T, end?: T];

interface Option1 {
	start: Period[0];
	end?: Period[1];
}

interface Option2 {
	period: Period;
}

interface CommonOption {
	format?: TimeProps["format"];
	fallback?: React.ReactNode;
}

interface RenderProps extends useRender.ComponentProps<"p"> {
}

export type PeriodBoxProps =
	RenderProps
	& CommonOption
	& (Option1 | Option2);

export function PeriodBox({
	// @ts-expect-error: ts(2339)
	start: _start, end: _end, period,

	format,
	fallback,
	render,
	...props
}: PeriodBoxProps) {
	const start: Date = _start ?? period?.[0];
	const end: Date | undefined = _end ?? period?.[1];
	const isSame = start.getTime() === end?.getTime();

	const defaultProps: useRender.ElementProps<"p"> = {
		children: <>
			<Time value={start} format={format}/>
			{!isSame && " ~ "}
			{!isSame && end ? <Time value={end} format={format}/> : fallback}
		</>,
	};

	const element = useRender({
		defaultTagName: "p",
		render,
		props: mergeProps<"p">(defaultProps, props),
	});

	return element;
}
