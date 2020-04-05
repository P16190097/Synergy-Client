import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql',
    credentials: 'same-origin',
});

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:8080/graphql',
    options: {
        reconnect: true,
        lazy: true,
        connectionParams: () => ({
            token: localStorage.getItem('token'),
            refreshToken: localStorage.getItem('refreshToken'),
        }),
    },
});

const authMiddlewareLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    operation.setContext({
        headers: {
            // authorization: token ? `Bearer ${token}` : '',
            'x-token': token || '',
            'x-refresh-token': refreshToken || '',
        },
    });

    return forward(operation);
});

const authAfterwareLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        const context = operation.getContext();
        const { response: { headers } } = context;

        if (headers) {
            const token = headers.get('x-token');
            const refreshToken = headers.get('x-refresh-token');

            if (token) {
                localStorage.setItem('token', token);
            }

            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
        }

        return response;
    });
});

const gqlErrorAfterware = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLinkWithMiddleware = ApolloLink.from([
    gqlErrorAfterware,
    authAfterwareLink,
    authMiddlewareLink,
    httpLink,
]);

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLinkWithMiddleware,
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;
