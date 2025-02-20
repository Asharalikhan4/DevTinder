import { FC } from "react";
import { RouterProvider } from "react-router";
import router from "./router/Routes";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: FC = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    );
};

export default App;