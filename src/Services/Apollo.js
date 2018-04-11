import {ApolloClient} from 'apollo-client';
import {split} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {getMainDefinition} from 'apollo-utilities';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import UserService from "./User";

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT_SIMPLE,
});

const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT_SUBSCRIPTIONS,
    options: {
        reconnect: true,
        connectionParams: {
            Authorization: `Bearer ${UserService.getToken()}`
        },
    }
});

const authLink = setContext((_, {headers}) => {
    const token = UserService.getToken();
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const link = split(
    ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink),
);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});

export default client;