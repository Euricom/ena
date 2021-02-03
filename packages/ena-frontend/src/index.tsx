import { Configuration, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Auth from "./authentication/Auth";
import ApolloConnection from "./graphql/ApolloConnection";

// MSAL configuration
const configuration: Configuration = {
    auth: {
        clientId: process.env.REACT_APP_AD_CLIENT || "",
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AD_TENANT}/`,
    },
};

const pca = new PublicClientApplication(configuration);

ReactDOM.render(
    <React.StrictMode>
        <MsalProvider instance={pca}>
            <Auth>
                <ApolloConnection>
                    <App />
                </ApolloConnection>
            </Auth>
        </MsalProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
