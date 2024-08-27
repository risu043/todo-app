import {RouteObject} from "react-router-dom";
import {Layout, ErrorFallback} from "@/components";
import {Error404} from "@/pages/error_404";
import {Top} from "@/pages/top";
import {SignUp} from "@/pages/sign_up";
import {SignIn} from "@/pages/sign_in";

export const AppRoutes: RouteObject[] = [
  {
    path: "/",
    errorElement: <ErrorFallback />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Top />,
          },
          {
            path: "/sign-up",
            element: <SignUp />,
          },
          {
            path: "/sign-in",
            element: <SignIn />,
          },
        ],
      },
      {path: "*", element: <Error404 />},
    ],
  },
];
