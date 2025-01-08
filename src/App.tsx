import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Route, Routes } from "react-router";
import { Charts } from "./pages/charts";
import { Layout } from "./pages/layout/index";
import { Logs } from "./pages/logs-page";
import { WorkoutTemplates } from "./pages/workout-templates";
import "./styles.css";
import { theme } from "./theme";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications
        position="top-right"
        zIndex={1000}
        limit={5}
        autoClose={4000}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/logs" element={<Logs />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/templates" element={<WorkoutTemplates />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
