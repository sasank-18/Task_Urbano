import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories from "./pages/Categories";
import LoginView from "./pages/loginView";
import ProfileDetail from "./pages/ProfileDetail";
import AppLayout from "./layout/AppLayout";
import Services from "./pages/Services";
import PanditServices from "./pages/PanditServices";
import Error from "./Component/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <LoginView />,
      },

      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "profile/:pandit_id",
        element: <ProfileDetail />,
      },
      {
        path: "services",
        element: <Services/>,
      },
      {
        path: "pandit_service",
        element: <PanditServices/>,
      },
      {
        path: "error",
        element: <Error/>,
      },
    ],
  },
  // {
  //   path: "about",
  //   element: <div>About</div>,
  // },
]);

<RouterProvider router={router} />;

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
