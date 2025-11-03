import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout.tsx";
import AuthLayout from "./layout/AuthLayout.tsx";
import About from "./pages/About/about.tsx";
import Home from "./pages/Home/home.tsx";
import TourPackages from "./pages/Services's/TourPackages.tsx";
import TourInformation from "./pages/Services's/TourInformation.tsx";
import ComingSoon from "./components/common/ComingSoonError.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ComingSoon />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },

      //packages
      { path: "tour-packages", element: <TourPackages /> },
      {
        path: "tour-packages/tour-information/:id",
        element: <TourInformation />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <></> },
      { path: "signup", element: <></> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
