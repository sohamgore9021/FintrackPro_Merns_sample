import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { ContextProvider } from "./app/context/MyContext";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <AppRoutes />
  </ContextProvider>
);
