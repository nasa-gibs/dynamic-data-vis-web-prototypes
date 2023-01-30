import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import myTheme from "./theme";
import ApiTestingPage from "./pages/ApiTestingPage";
import ImageryPage from "./pages/ImageryPage";

export const App = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <ChakraProvider theme={myTheme}>
      <Routes>
        {/* <Route path="/gibs" element={<ImageryPage />} /> */}
        <Route path="/dynamic-data-vis-web-prototypes" element={<ApiTestingPage />} />
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
);
