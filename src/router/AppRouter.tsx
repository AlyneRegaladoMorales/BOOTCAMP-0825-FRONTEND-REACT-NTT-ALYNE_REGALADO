import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Summary from "../pages/Summary";
import ProtectedRoute from "./ProtectedRoute";
import Me from "../pages/me";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/summary",
        element: <Summary />,
      },
      {
        path:"/me",
        element: <Me />
      }
    ],
  },
]);
export { router };
