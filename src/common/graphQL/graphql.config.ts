import { HttpLink, InMemoryCache, ApolloClient, ApolloLink } from 'apollo-boost';
// @ts-ignore
import { CX_DEVX_API_GATEWAY_URL, CX_DEVX_API_GATEWAY_PORT, CX_DEVX_SERVERLESS_URL, CX_DEVX_CDN_PORT } from 'react-native-dotenv';
import { createUploadLink } from 'apollo-upload-client';

const gatewayClient = new HttpLink({
    uri: `http://${CX_DEVX_API_GATEWAY_URL}:${CX_DEVX_API_GATEWAY_PORT}/graphql`
});

const cxDevxCdnLink = createUploadLink({
    uri: `http://${CX_DEVX_API_GATEWAY_URL}:${CX_DEVX_CDN_PORT}/graphql`,
    headers: {
        "keep-alive": "true"
    }
});

const serverlessLink = new HttpLink({
    uri: CX_DEVX_SERVERLESS_URL
    // uri: `http://192.168.43.93:3000/dev/graphql`
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


const devXFileUploadClient = new ApolloClient({
    link: cxDevxCdnLink,
    cache: cache,
})


export { graphqlClient, serverlessClient, devXFileUploadClient };
