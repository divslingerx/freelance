import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./store/configureStore";
import router from "./routers/AppRouter";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
