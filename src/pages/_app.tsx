import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import theme from '../theme'

 import {
   QueryClient,
   QueryClientProvider,
 } from "react-query";
 import { ReactQueryDevtools } from 'react-query/devtools'


function MyApp({ Component, pageProps }) {
  
  // Create a client
  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp
