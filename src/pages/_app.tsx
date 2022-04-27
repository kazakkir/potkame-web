import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import 'focus-visible/dist/focus-visible';

import { Global, css } from '@emotion/react';
import Script from 'next/script';
import Layout from '../components/Layout';
import { useMeQuery } from '../generated/graphql';
import { theme } from '../../styles/theme';

const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }

  .mapboxgl-popup-content {
    padding: 0 !important;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <Script
        src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"
        strategy="lazyOnload"
      />
      <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          <Global styles={GlobalStyles} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
