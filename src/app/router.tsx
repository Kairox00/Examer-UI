import { createBrowserRouter, RouterProvider } from "react-router";
import { paths } from "../config/paths";
import StudentPortal from "./pages/StudentPortal";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: paths.app.studentPortal.path,
    element: <StudentPortal />,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
