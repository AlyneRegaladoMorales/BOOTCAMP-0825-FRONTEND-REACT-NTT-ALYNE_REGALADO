import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Summary from "../pages/Summary/Summary";
import ProtectedRoute from "./ProtectedRoute";
import Me from "../pages/Me/Me";
import { AppPaths } from "../utils/AppPaths";


const router = createBrowserRouter([
  {
    path: AppPaths.ROOT,
    element: <Login />,
  },
  {
    path: AppPaths.ROOT,
    element: <ProtectedRoute />,
    children: [
      {
        path: AppPaths.HOME,
        element: <Home />,
      },
      {
        path: AppPaths.SUMMARY,
        element: <Summary />,
      },
      {
        path: AppPaths.PROFILE,
        element: <Me />
      }
    ],
  },
]);
export { router };
