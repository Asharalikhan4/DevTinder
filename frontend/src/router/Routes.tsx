import Layout from "@/components/Layout/Layout";
import FeedPage from "@/pages/Feed/FeedPage";
import SigninPage from "@/pages/Signin/SigninPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <FeedPage />
            },
            {
                path: "/signin",
                element: <SigninPage />
            }        
        ]
    }
]);

export default router;