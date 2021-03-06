import '../styles/globals.css';
import App, { AppContext, AppProps } from 'next/app';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppState, Auth0Provider } from '@auth0/auth0-react';
import Router from 'next/router';
import { useState } from 'react';

const onRedirectCallback = (appState?: AppState) => {
  Router.replace(appState?.returnTo || '/');
};

export default function IssueTrackerApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 5 * 60 * 1000,
        },
      },
    })
  );

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID as string}
      redirectUri={
        typeof window !== 'undefined'
          ? window.location.origin + '/issues'
          : undefined
      }
      onRedirectCallback={onRedirectCallback}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
      scope='openid profile email'
      useRefreshTokens={true}
      cacheLocation='localstorage'
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools
          initialIsOpen={false}
          position='bottom-right'
          panelProps={{ style: { width: 'calc(100vw - 273px)' } }}
        />
      </QueryClientProvider>
    </Auth0Provider>
  );
}

IssueTrackerApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
