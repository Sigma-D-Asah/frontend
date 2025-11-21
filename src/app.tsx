import { Route, Routes } from "react-router-dom";

import DashboardPage from "@/pages/dashboard";
import HomePage from "@/pages/home";
import WelcomePage from "@/pages/welcome";
import MaintenancePage from "@/pages/maintenance";
import ReportingPage from "@/pages/reporting";
import ClaimsPage from "@/pages/claims";
import DocsPage from "@/pages/docs";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route element={<DashboardPage />} path="/" />
      <Route element={<DashboardPage />} path="/dashboard" />
      <Route element={<HomePage />} path="/home" />
      <Route element={<ClaimsPage />} path="/claims" />
      <Route element={<WelcomePage />} path="/welcome" />
      <Route element={<MaintenancePage />} path="/maintenance" />
      <Route element={<ReportingPage />} path="/reporting" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
