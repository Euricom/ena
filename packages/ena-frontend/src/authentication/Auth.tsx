import { InteractionType } from "@azure/msal-browser";
import {
    AuthenticatedTemplate,
    UnauthenticatedTemplate,
    useMsalAuthentication,
} from "@azure/msal-react";
import React, { useEffect } from "react";

function Auth(props: { children: any }) {
    const { login, error } = useMsalAuthentication(InteractionType.Redirect);

    // Go back to login when an error occurs in the authentication part
    useEffect(() => {
        if (error) {
            login(InteractionType.Popup);
        }
    }, [error, login]);

    return (
        <>
            <AuthenticatedTemplate>{props.children}</AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <p>No users are signed in</p>
            </UnauthenticatedTemplate>
        </>
    );
}

export default Auth;
