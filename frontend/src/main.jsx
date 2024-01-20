import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthProvider.jsx";

const customStyles = {
  success: {
    backgroundColor: "#16C60C",
    color: "white",
    duration: 3000,
  },
  error: {
    backgroundColor: "#F03A17",
    duration: 6000,
    color: "white",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <Toaster
          toastOptions={{
            position: "top-center",
            success: {
              style: { ...customStyles.success },
              iconTheme: {
                primary: "#fff",
                secondary: "green",
              },
            },
            error: {
              style: { ...customStyles.error },
              iconTheme: {
                primary: "#fff",
                secondary: "red",
              },
            },
          }}
        />
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
