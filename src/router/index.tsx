import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import ErrorPage from "../pages/error";
import SuccessPage from "../pages/success";

const router = createBrowserRouter([
  {
    path: "",
    element: <HomePage />,
  },
  {
    path: "success",
    element: <SuccessPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
