import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import React from "react";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "./providers/auth/AuthProvider.tsx";
// import SocketProvider from "./providers/socket/SocketProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                {/* <SocketProvider> */}
                    <App />
                {/* </SocketProvider> */}
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);
