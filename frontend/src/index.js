import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Users, {
  loader as usersLoader,
  Error as UsersError,
} from "./users/Users";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <h1>Welcome to the home page</h1>,
      },
      {
        path: "/users",
        element: <Users />,
        loader: usersLoader,
        errorElement: <UsersError />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
