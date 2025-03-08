import Layout from "../components/Layout/Layout";
import ConnectionsPage from "../pages/Connections/ConnectionsPage";
import FeedPage from "../pages/Feed/FeedPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import RequestsPage from "../pages/Requests/RequestsPage";
import SigninPage from "../pages/Signin/SigninPage";
import SignupPage from "../pages/Signup/SignupPage";
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
            },
            {
                path: "/signup",
                element: <SignupPage />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/connections",
                element: <ConnectionsPage />
            },
            {
                path: "/requests",
                element: <RequestsPage />
            }
        ]
    }
]);

export default router;