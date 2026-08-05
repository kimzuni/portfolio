"use client";

import {
	Fragment,
	createContext,
	useContext,
	useState,
	useLayoutEffect,
} from "react";

import { useNavigation } from "@/hooks/use-navigation";

import {
	Breadcrumb as BaseBreadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbEllipsis,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/components/link";



const DEFAULT_ELLIPSIS: boolean = false;



interface LayoutBreadcrumbDefaultItem {
	label: string;
	href: string;
}

interface LayoutBreadcrumbEllipsisItem {
	ellipsis: true;
}

interface LayoutBreadcrumbLastItem {
	label: string | null;
}

type LayoutBreadcrumbItemsType = [
	...parents: Array<LayoutBreadcrumbDefaultItem | LayoutBreadcrumbEllipsisItem>,
	page: LayoutBreadcrumbLastItem,
];



interface LayoutBreadcrumbContext {
	show: boolean;
	items: LayoutBreadcrumbItemsType;
	hasEllipsis: boolean;
	setLabel: (label: string | null) => void;
	setEllipsis: (value: boolean | null) => void;
}

const LayoutBreadcrumbContext = createContext<LayoutBreadcrumbContext | null>(null);

export function useLayoutBreadcrumb() {
	const context = useContext(LayoutBreadcrumbContext);
	if (!context) {
		throw new Error("useLayoutBreadcrumb must be used within a LayoutBreadcrumbProvider.");
	}

	return context;
}



interface LayoutBreadcrumbProviderProps {
	isShownOnHome?: boolean;
	lastLabelAutoDetect?: boolean;
	children?: React.ReactNode;
}

export function LayoutBreadcrumbProvider({
	isShownOnHome = false,
	lastLabelAutoDetect = false,
	...props
}: LayoutBreadcrumbProviderProps) {
	const { pathname } = useNavigation();
	const split = pathname.split("/").filter(Boolean);
	const page = split[0];

	const isHome = split.length === 0;
	const pageIsLastPage = split.length === 1;
	const pageLabel = `${page?.slice(0, 1).toUpperCase()}${page?.slice(1)}`;

	const items1: LayoutBreadcrumbItemsType = [
		{ label: lastLabelAutoDetect ? "Home" : null },
	];

	const items2: LayoutBreadcrumbItemsType = [
		{ label: "Home", href: "/" },
		{ label: lastLabelAutoDetect ? pageLabel : null },
	];

	const items3: LayoutBreadcrumbItemsType = [
		{ label: "Home", href: "/" },
		{ label: pageLabel, href: `/${page}` },
		{ label: lastLabelAutoDetect ? split[split.length - 1] ?? null : null },
	];

	const items4: LayoutBreadcrumbItemsType = [
		{ label: "Home", href: "/" },
		{ label: pageLabel, href: `/${page}` },
		{ ellipsis: true },
		{ label: lastLabelAutoDetect ? split[split.length - 1] ?? null : null },
	];



	const detectItems = isHome ? items1 : pageIsLastPage ? items2 : items3;

	const [prevPathname, setPrevPathname] = useState(pathname);
	const [hasEllipsis, setHasEllipsis] = useState(DEFAULT_ELLIPSIS);
	const [items, setItems] = useState<LayoutBreadcrumbItemsType>(detectItems);

	if (prevPathname !== pathname) {
		setPrevPathname(pathname);
		setItems(detectItems);
		setHasEllipsis(DEFAULT_ELLIPSIS);
	}

	const setLabel = (label: string | null) => {
		setItems(prev => {
			if (!prev.length) return prev;

			const lastItem = prev[prev.length - 1] as LayoutBreadcrumbLastItem;
			if (lastItem.label === label) return prev;

			const copy = [...prev] as LayoutBreadcrumbItemsType;
			copy[copy.length - 1] = { label: label };
			return copy;
		});
	};

	const setEllipsis = (value: boolean | null) => {
		const newItems = [...(value ? items4 : items3)] as LayoutBreadcrumbItemsType;

		setItems(prev => {
			if (prev.length < 3) return prev;
			const { label } = prev[prev.length - 1] as LayoutBreadcrumbLastItem;
			newItems[newItems.length - 1] = { label };
			return newItems;
		});

		setHasEllipsis(value ?? DEFAULT_ELLIPSIS);
	};

	return (
		<LayoutBreadcrumbContext.Provider
			value={{
				show: isShownOnHome || !!split.length,
				items,
				hasEllipsis,
				setLabel,
				setEllipsis,
			}}
			{...props}
		/>
	);
}

export interface LayoutBreadcrumbProps extends React.ComponentProps<typeof BaseBreadcrumb> {
}

export function LayoutBreadcrumb({
	...props
}: LayoutBreadcrumbProps) {
	const { show, items } = useLayoutBreadcrumb();
	if (!show) return null;

	return (
		<BaseBreadcrumb {...props}>
			<BreadcrumbList>
				{items.map((item, idx) => (
					<Fragment key={idx}>
						<BreadcrumbItem>
							{
								"ellipsis" in item
								? <BreadcrumbEllipsis/>
								: "href" in item
									? <BreadcrumbLink render={<Link href={item.href}/>}>{item.label}</BreadcrumbLink>
									: <BreadcrumbPage>{item.label}</BreadcrumbPage>
							}
						</BreadcrumbItem>
						{idx !== items.length - 1 && <BreadcrumbSeparator/>}
					</Fragment>
				))}
			</BreadcrumbList>
		</BaseBreadcrumb>
	);
}



export function LayoutBreadcrumbConfig({
	label,
	ellipsis,
}: {
	label?: string | null;
	ellipsis?: boolean | null;
}) {
	const { setEllipsis, setLabel} = useLayoutBreadcrumb();

	useLayoutEffect(() => {
		if (label !== undefined) {
			setLabel(label);
		}
		if (ellipsis !== undefined) {
			setEllipsis(ellipsis);
		}
	}, [label, ellipsis, setLabel, setEllipsis]);

	return null;
}
