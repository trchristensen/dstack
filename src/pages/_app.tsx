import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import theme from "../theme";
import styles from "../styles/app.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import { AuthProvider } from '../lib/_auth';
import { AuthProvider } from "../lib/AuthProvider";

function MyApp({ Component, pageProps }) {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider 
        resetCSS
         theme={theme}
         >
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
    </AuthProvider>
  );
}

export default MyApp;
