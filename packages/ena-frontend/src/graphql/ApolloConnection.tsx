import React, { FC } from "react";
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
    from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { useMsal } from "@azure/msal-react";

const ApolloConnection: FC<any> = ({ ...props }) => {
    const { instance, accounts } = useMsal();

    // Middleware to add the token to all graphql calls
    const withToken = setContext(async (_, { headers }) => {
        const token = await instance.acquireTokenSilent({
            scopes: [],
            account: accounts[0] as any,
        });

        return {
            headers: {
                ...headers,
                Authorization: token ? `Bearer ${token.idToken}` : null,
            },
        };
    });

    // Middleware to logoout the user when the api returns unauthorized
    const resetToken = onError(({ response, networkError, graphQLErrors }) => {
        console.log(response, networkError, graphQLErrors);
        if (
            response?.errors &&
            response.errors[0].extensions?.exception?.status === 401
        ) {
            instance.logout();
        }
    });

    const httpLink = createHttpLink({
        uri: process.env.REACT_APP_GRAPHQL_URL,
    });

    const client = new ApolloClient({
        link: from([withToken, resetToken, httpLink]),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{props?.children}</ApolloProvider>;
};

export default ApolloConnection;
