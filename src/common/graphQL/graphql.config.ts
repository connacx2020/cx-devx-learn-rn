import { HttpLink, InMemoryCache, ApolloClient, ApolloLink } from 'apollo-boost';
import { ENV } from '../envirnoment';

const gatewayClient = new HttpLink({
    uri: `http://${ENV.apiGateway_baseUrl}:${ENV.apiGateway_port}/graphql`,
});

// const notiClient = new HttpLink({
//     uri: `http://${ENV.apiGateway_baseUrl}:${ENV.notiPort}/graphql`,
// });

  const cache = new InMemoryCache();

  const graphqlClient = new ApolloClient({
      link: ApolloLink.from([gatewayClient]),
      cache,
  });


export { graphqlClient };
