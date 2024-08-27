import {Suspense} from "react";
import {Outlet} from "react-router-dom";

export function Layout() {
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
}
