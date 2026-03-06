import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { ConfettiProvider } from "./components/Confetti";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import BrainLabPage from "./pages/BrainLabPage";
import GamesPage from "./pages/GamesPage";
import HomePage from "./pages/HomePage";
import ProgressPage from "./pages/ProgressPage";
import QuestsPage from "./pages/QuestsPage";
import ResourcesPage from "./pages/ResourcesPage";
import ShopPage from "./pages/ShopPage";
import SubjectHelperPage from "./pages/SubjectHelperPage";

export { Link, useLocation, useNavigate };

const rootRoute = createRootRoute({
  component: () => (
    <ConfettiProvider>
      <Layout>
        <Outlet />
      </Layout>
      <Toaster position="top-right" />
    </ConfettiProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/games",
  component: GamesPage,
});

const resourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/resources",
  component: ResourcesPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: AnalyticsPage,
});

const brainLabRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/brain-lab",
  component: BrainLabPage,
});

const subjectHelperRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subject-helper",
  component: SubjectHelperPage,
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/progress",
  component: ProgressPage,
});

const questsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quests",
  component: QuestsPage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: ShopPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  gamesRoute,
  resourcesRoute,
  aboutRoute,
  analyticsRoute,
  brainLabRoute,
  subjectHelperRoute,
  progressRoute,
  questsRoute,
  shopRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
