import { formatDate } from "@/lib/utils";



export interface TimeProps extends Omit<React.ComponentProps<"time">, "children"> {
	date: Date;
}

export function Time({ date, ...props }: TimeProps) {
	return (
		<time
			dateTime={date.toISOString().split("T")[0]}
			children={formatDate(date)}
			{...props}
		/>
	);
}
