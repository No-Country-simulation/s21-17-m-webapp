import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { system } from "./app/config/theme.js";
import StoreProviders from "./app/providers/StoreProviders.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <StoreProviders>
        <App />
      </StoreProviders>
    </ChakraProvider>
  </StrictMode>
);
