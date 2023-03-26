import { ReactElement } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import The404 from "./pages/The404";
import Navbar from "./components/Design/Navbar/Navbar";
import Loading from "./components/Design/loading";
import Home from "./pages/Home/Home";

function App(): ReactElement {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications autoClose={4000} />
      <Loading />
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="*" element={<The404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
