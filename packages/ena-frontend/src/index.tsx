import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Auth from "./authentication/Auth";
import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

// MSAL configuration
const configuration: Configuration = {
  auth: {
    clientId: "CLIENT_ID",
    authority: `https://login.microsoftonline.com/TENANT_ID/`,
  },
};

const pca = new PublicClientApplication(configuration);

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <Auth>
        <App />
      </Auth>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
