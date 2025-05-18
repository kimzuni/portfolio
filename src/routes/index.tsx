import { RouteObject } from "react-router";

import Layout from "../layouts";
import NotFound from "../pages/404";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Project from "../pages/Project";

import { projects } from "../items";



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
			...projects.map(([id, item]) => ({
				path: `/projects/${id}`,
				element: <Project {...item}/>,
			})),
		],
	},
	{
		path: "*",
		element: <NotFound/>,
	},
] as RouteObject[];
