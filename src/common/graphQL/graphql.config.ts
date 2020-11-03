import { HttpLink, InMemoryCache, ApolloClient, ApolloLink } from 'apollo-boost';
// @ts-ignore
import { CX_DEVX_API_GATEWAY_URL, CX_DEVX_API_GATEWAY_PORT, CX_DEVX_CDN_PORT } from 'react-native-dotenv';
import { createUploadLink } from 'apollo-upload-client';

const gatewayClient = new HttpLink({
    uri: `http://192.168.1.4:${CX_DEVX_API_GATEWAY_PORT}/graphql`
});

const cxDevxCdnLink = createUploadLink({
    uri: `http://192.168.1.4:${CX_DEVX_CDN_PORT}/graphql`,
    headers: {
        "keep-alive": "true"
    }
});


const cache = new InMemoryCache();

const graphqlClient = new ApolloClient({
    link: ApolloLink.from([gatewayClient]),
    cache,
});



const devXFileUploadClient = new ApolloClient({
    link: cxDevxCdnLink,
    cache: cache,
})


export { graphqlClient, devXFileUploadClient };
