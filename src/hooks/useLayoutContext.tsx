import { useOutletContext } from "react-router";

import { useLayoutContextType } from "../layouts";



export default function useLayoutContext() {
	return useOutletContext<useLayoutContextType>();
};
