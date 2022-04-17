import '../styles/globals.css';
import App, { AppContext, AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppState, Auth0Provider } from '@auth0/auth0-react';
import Router from 'next/router';
import AppHead from '../components/appHead';

const onRedirectCallback = (appState: AppState) => {
  Router.replace(appState?.returnTo || '/');
};

export default function IssueTrackerApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID as string}
      redirectUri={
        typeof window !== 'undefined' ? window.location.origin : undefined
      }
      onRedirectCallback={onRedirectCallback}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
      scope='openid profile email'
    >
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: {
              queries: {
                retry: false,
                staleTime: 5 * 60 * 1000,
              },
            },
          })
        }
      >
        <Hydrate state={pageProps.dehydratedState}>
          <AppHead />
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </Auth0Provider>
  );
}

IssueTrackerApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
