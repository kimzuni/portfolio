import { Time } from "./time";



export interface PeriodProps<T extends React.ElementType = "p"> {
	as?: T;
	start: Date;
	end?: Date;
	fallback?: React.ReactNode;
	className?: string;
}

export function Period<T extends React.ElementType = "p">({
	as,
	start,
	end,
	fallback,
	...props
}: PeriodProps<T>) {
	const Comp = as ?? "p";
	const isSame = start.getTime() === end?.getTime();

	return (
		<Comp {...props}>
			<Time date={start}/>
			{!isSame && " ~ "}
			{!isSame && end ? <Time date={end}/> : fallback}
		</Comp>
	);
}
