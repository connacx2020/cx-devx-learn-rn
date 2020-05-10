// import { HttpLink, InMemoryCache, ApolloClient, ApolloLink } from 'apollo-boost';
import { ENV } from '../envirnoment';
import ApolloClient from 'apollo-boost';

const graphqlClient = new ApolloClient({
    uri: `http://${ENV.apiGateway_baseUrl}:${ENV.apiGateway_port}/graphql`,
});

//   const cache = new InMemoryCache({addTypename: false});

//   const graphqlClient = new ApolloClient({
//       link: ApolloLink.from([gatewayClient]),
//       cache,
//   });


export { graphqlClient };
