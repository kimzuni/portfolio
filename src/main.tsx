import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";

import "./styles/index.css";
import routes from "./routes";



createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<HelmetProvider>
			<RouterProvider router={createBrowserRouter(routes)}/>
		</HelmetProvider>
	</StrictMode>,
);
