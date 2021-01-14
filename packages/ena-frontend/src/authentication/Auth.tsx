import { InteractionType } from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsalAuthentication,
} from "@azure/msal-react";
import React, { useEffect } from "react";

function Auth(props: { children: any }) {
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Redirect
  );

  useEffect(() => {
    if (error) {
      console.log(error);
      login(InteractionType.Popup);
    }
  }, [error]);

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
