import { useRender, mergeProps } from "@base-ui/react";

import { Time } from "@/components/time";



export type Period = [start: Date, end?: Date];

interface Option1 {
	start: Period[0];
	end?: Period[1];
}

interface Option2 {
	period: Period;
}

interface CommonOption {
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

	fallback,
	render,
	...props
}: PeriodBoxProps) {
	const start: Date = _start ?? period?.[0];
	const end: Date = _end ?? period?.[1];
	const isSame = start.getTime() === end?.getTime();

	const defaultProps: useRender.ElementProps<"p"> = {
		children: <>
			<Time date={start}/>
			{!isSame && " ~ "}
			{!isSame && end ? <Time date={end}/> : fallback}
		</>,
	};

	const element = useRender({
		defaultTagName: "p",
		render,
		props: mergeProps<"p">(defaultProps, props),
	});

	return element;
}
