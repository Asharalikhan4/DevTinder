import Layout from "@/components/Layout/Layout";
import HomePage from "@/pages/Home/HomePage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            }            
        ]
    }
]);

export default router;