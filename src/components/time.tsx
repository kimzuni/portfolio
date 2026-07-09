import * as format from "@/lib/format";



export interface TimeProps extends Omit<React.ComponentProps<"time">, "children"> {
	date: Date;
}

export function Time({ date, ...props }: TimeProps) {
	return (
		<time
			dateTime={date.toISOString().split("T")[0]}
			{...props}
		>
			{format.date(date)}
		</time>
	);
}
