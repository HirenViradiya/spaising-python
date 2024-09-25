import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFoundPage from "./pages/NotFound";
import RootLayout from "./pages/Root";
import UserPage from "./pages/users/Users";
import CreateUser from "./pages/users/CreateUser";
import EditUser from "./pages/users/EditUser";
import ViewUser from "./pages/users/ViewUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <UserPage /> },
      { path: "/user/add", element: <CreateUser /> },
      { path: "/user/edit/:id", element: <EditUser /> },
      { path: "/user/view/:id", element: <ViewUser /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
