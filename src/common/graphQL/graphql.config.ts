import { HttpLink, InMemoryCache, ApolloClient, ApolloLink } from 'apollo-boost';
// @ts-ignore
import { CX_DEVX_API_GATEWAY_URL, CX_DEVX_CDN_URL } from 'react-native-dotenv';
import { createUploadLink } from 'apollo-upload-client';

const gatewayClient = new HttpLink({
    uri: CX_DEVX_API_GATEWAY_URL
});

const cxDevxCdnLink = createUploadLink({
    uri: CX_DEVX_CDN_URL,
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
