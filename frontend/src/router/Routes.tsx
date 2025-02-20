import Layout from "@/components/Layout/Layout";
import HomePage from "@/pages/Home/HomePage";
import SigninPage from "@/pages/Signin/SigninPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/signin",
                element: <SigninPage />
            }        
        ]
    }
]);

export default router;