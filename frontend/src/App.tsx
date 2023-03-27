import { ReactElement } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import The404 from "./pages/The404";
import Navbar from "./components/Design/Navbar/Navbar";
import Loading from "./components/Design/loading";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Favourites from "./pages/Favourites/Favourites";
import Book from "./pages/Book/Book";

function App(): ReactElement {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
        breakpoints: {
          xs: "500",
          sm: "800",
          md: "1000",
          lg: "1200",
          xl: "1400",
        },
      }}
    >
      <Notifications autoClose={4000} />
      <Loading />
      <BrowserRouter>
        <Navbar />
        <Login />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="favourites">
              <Route index element={<Favourites />} />
            </Route>
            <Route path="book/:_id">
              <Route index element={<Book />} />
            </Route>
            <Route path="*" element={<The404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
