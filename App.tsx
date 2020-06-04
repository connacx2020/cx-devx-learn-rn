/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { Providers } from './src/Providers/Providers'
import { ApolloProvider } from '@apollo/react-hooks';
import { graphqlClient } from './src/common/graphQL/graphql.config';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/common/redux';

// const token: String = '';

const App: React.FC = () => {

    return (
        <ApolloProvider client={graphqlClient}>
            <ReduxProvider store={store}>
                <Providers />
            </ReduxProvider>
        </ApolloProvider>

    );
};

export default App;
