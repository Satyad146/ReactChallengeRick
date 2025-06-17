import { createRouter, RouterProvider, createRootRoute, Outlet, createRoute } from "@tanstack/react-router";
import CharacterListPage from "./pages/CharacterListPage";
import CharacterDetailPage from "./pages/CharacterDetails";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
})
export const characterListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CharacterListPage,
});

export const characterDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/character/$characterId",
  component: CharacterDetailPage,
});

const routeTree = rootRoute.addChildren([characterListRoute, characterDetailRoute]);

export const router = createRouter({ routeTree });

export function AppRouter() {
  return <RouterProvider router={router} />;
}