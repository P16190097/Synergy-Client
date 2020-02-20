import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import rootReducer from './reducers';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';

const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql',
    credentials: 'same-origin',
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

const link = ApolloLink.from([
    gqlErrorAfterware,
    authAfterwareLink,
    authMiddlewareLink,
    httpLink,
]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});


const store = createStore(rootReducer);

const App = () => {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Routes />
            </ApolloProvider>
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
