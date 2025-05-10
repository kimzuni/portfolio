import { useCallback } from "react";



export default function useMergedRefs<E extends HTMLElement>(...refs: (React.Ref<E> | undefined)[]) {
	return useCallback((node: E) => {
		refs.forEach(ref => {
			if (!refs) return;
			if (typeof ref === "function") {
				ref(node);
			} else if (ref && typeof ref === "object") {
				ref.current = node;
			}
		})
	}, [refs]);
}
