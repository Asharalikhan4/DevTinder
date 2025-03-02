import { FC } from "react";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import router from "./router/Routes";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";

const App: FC = () => {
    return (
        <Provider store={appStore}>
            <RouterProvider router={router} />
            <Toaster />
        </Provider>
    );
};

export default App;