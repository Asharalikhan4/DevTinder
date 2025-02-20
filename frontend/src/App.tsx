import { FC } from "react";
import { RouterProvider } from "react-router";
import router from "./router/Routes";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";

const App: FC = () => {
    return (
        <Provider store={appStore}>
            <RouterProvider router={router} />
        </Provider>
    );
};

export default App;