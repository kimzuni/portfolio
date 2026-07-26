export interface FilterItem<Slug extends string | null = string | null> {
	slug?: Slug;
	value?: Slug;
	label: string;
	size?: number;
}

export interface FilterGroupItem<T extends FilterItem> {
	label: string;
	items: T[];
}



export type ItemsToBoolean<T extends FilterItem> = (a: T, b: T) => boolean;
export type ItemToString<T extends FilterItem, R = string> = (item: T) => R;



export type FilterSlugItem<T extends FilterItem> =
	& Omit<T, "value">
	& { slug: Exclude<T["slug"], undefined> };

export interface FilterSlugGroupItem<T extends FilterItem> {
	label: string;
	items: Array<FilterSlugItem<T>>;
}
