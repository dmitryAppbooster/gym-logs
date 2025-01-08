import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.module.css";
import { Layout } from "@/pages/layout";
import { WorkoutTemplates } from "@/pages/workout-templates";
import { theme } from "./theme";
import { Charts } from "@/pages/charts";
import { Logs } from "@/pages/logs";

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
