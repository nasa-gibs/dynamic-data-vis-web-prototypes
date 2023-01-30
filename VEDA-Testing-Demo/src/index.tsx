import { ColorModeScript } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <ColorModeScript />
    <App />
  </Provider>
);
