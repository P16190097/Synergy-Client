import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import rootReducer from './reducers';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';

const store = createStore(rootReducer);

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
});

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
