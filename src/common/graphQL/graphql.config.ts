import { HttpLink, InMemoryCache, ApolloClient, ApolloLink } from 'apollo-boost';
import { ENV } from '../envirnoment';

const gatewayClient = new HttpLink({
    uri: `http://${ENV.apiGateway_baseUrl}:${ENV.apiGateway_port}/graphql`,
});

const serverlessLink = new HttpLink({
    uri: `https://noq5efwak3.execute-api.ap-southeast-1.amazonaws.com/dev/graphql`,
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
