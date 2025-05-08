import { RouteObject } from "react-router";

import Layout from "../layouts";
import NotFound from "../pages/404";
import Home from "../pages/home";
import Projects from "../pages/projects";
import * as project from "./projects";



export default [
	{
		path: "/",
		element: <Layout/>,
		children: [
			{
				index: true,
				element: <Home/>,
			},
			{
				path: "/projects",
				element: <Projects/>,
			},
			...project.list.map(id => ({
				path: `/projects/${id}`,
				element: project.router(id),
			})),
		],
	},
	{
		path: "*",
		element: <NotFound/>,
	},
] as RouteObject[];
