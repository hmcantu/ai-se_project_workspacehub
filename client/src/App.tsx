import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { BookingsPage } from "./pages/BookingsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { FeatureFlagsPage } from "./pages/FeatureFlagsPage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OrganizationSettingsPage } from "./pages/OrganizationSettingsPage";
import { ProjectDetailsPage } from "./pages/ProjectDetailsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TasksPage } from "./pages/TasksPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailsPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route
            path="settings/organization"
            element={<OrganizationSettingsPage />}
          />
          <Route path="settings/features" element={<FeatureFlagsPage />} />
        </Route>
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};
