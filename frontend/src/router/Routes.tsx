import Layout from "@/components/Layout/Layout";
import FeedPage from "@/pages/Feed/FeedPage";
import ProfilePage from "@/pages/Profile/ProfilePage";
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
            } ,
            {
                path: "/profile",
                element: <ProfilePage />
            }       
        ]
    }
]);

export default router;