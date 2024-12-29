import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { apolloDevToolsInit } from 'react-native-apollo-devtools-client';
import { ThemeProvider } from '@/theme';
import '@/translations';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
        mutations: {
            retry: false,
        },
    },
});

export const storage = new MMKV();
// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
});
// if (__DEV__) {
//     apolloDevToolsInit(client);
// }

interface AppInitProviderProps {
    children: React.ReactNode;
}
export const AppInitProvider: React.FC<AppInitProviderProps> = ({ children }) => {
    return (
        <GestureHandlerRootView>
            <ApolloProvider client={client}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider storage={storage}>
                        {children}
                    </ThemeProvider>
                </QueryClientProvider>
            </ApolloProvider>
        </GestureHandlerRootView>
    )
}