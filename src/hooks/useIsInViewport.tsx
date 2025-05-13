import { useRef, useState, useEffect } from "react";



export default function useIsInViewport<E extends HTMLElement>(options?: IntersectionObserverInit) {
	const ref = useRef<E>(null);
	const [isInViewport, setIsInViewport] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const observer = new IntersectionObserver(([entry]) => {
			setIsInViewport(entry.isIntersecting);
		}, {
			threshold: 0.01,
			...options,
		});

		observer.observe(node);
		return () => {
			observer.disconnect();
		}
	}, [options]);

	return [ref, isInViewport] as const;
}
