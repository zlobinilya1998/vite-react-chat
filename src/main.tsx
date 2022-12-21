import { render } from 'preact'
import { App } from './app'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import './index.css'
import React from "preact/compat";
import Auth from "./components/Auth/Auth";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Auth/>
    },
    {
        path: "/chat",
        element: <App/>
    },
]);


render(<RouterProvider router={router} />, document.getElementById('app') as HTMLElement)
