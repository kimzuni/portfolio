const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "numeric",
	day: "numeric",
};



export type TimeValue = string | Date | number;

export interface TimeProps extends React.ComponentProps<"time"> {
	value: TimeValue;
	format?: Intl.DateTimeFormatOptions;
}



export function Time({
	value,
	format = DEFAULT_FORMAT,
	...props
}: TimeProps) {
	const date = value instanceof Date ? value : new Date(value);

	const isoString = date.toISOString();
	const string = new Intl.DateTimeFormat("ko-KR", format).format(date);

	return (
		<time
			dateTime={isoString}
			{...props}
		>
			{string}
		</time>
	);
}
