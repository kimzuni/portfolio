import { useRender, mergeProps } from "@base-ui/react";

import { Time } from "@/components/time";



export type Period = [start: Date, end?: Date];

export interface PeriodBoxProps extends useRender.ComponentProps<"p"> {
	start: Period[0];
	end?: Period[1];
	fallback?: React.ReactNode;
}

export function PeriodBox({
	start,
	end,
	fallback,
	render,
	...props
}: PeriodBoxProps) {
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
