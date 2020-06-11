import { HttpLink, InMemoryCache, ApolloClient, ApolloLink } from 'apollo-boost';
// @ts-ignore
import { CX_DEVX_API_GATEWAY_URL, CX_DEVX_API_GATEWAY_PORT, CX_DEVX_SERVERLESS_URL } from 'react-native-dotenv';

const gatewayClient = new HttpLink({
    uri: `http://${CX_DEVX_API_GATEWAY_URL}:${CX_DEVX_API_GATEWAY_PORT}/graphql`
});

const serverlessLink = new HttpLink({
    uri: 'https://noq5efwak3.execute-api.ap-southeast-1.amazonaws.com/dev/graphql'
});

const cache = new InMemoryCache();

const graphqlClient = new ApolloClient({
    link: ApolloLink.from([gatewayClient]),
    cache,
});

const serverlessClient = new ApolloClient({
    link: ApolloLink.from([serverlessLink]),
    cache,
});


export { graphqlClient, serverlessClient };
