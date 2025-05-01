import { createBrowserRouter, RouterProvider } from "react-router";
import { paths } from "../config/paths";
import ExamAttempt from "./pages/ExamAttempt";
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
  {
    path: "exam-attempt/:id",
    element: <ExamAttempt />,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
