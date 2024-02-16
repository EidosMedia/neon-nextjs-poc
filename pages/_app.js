import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';

import 'react-image-gallery/styles/css/image-gallery.css';
import Script from 'next/script';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

/**
 *
 * @param props
 */
export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    // const router = useRouter()

    // useEffect(() => {
    //   const handleRouteChange = (url) => {
    //     if (window && window.location) {
    //       ga.pageview(window.location)
    //     } else {
    //       console.log("cannot log to GA")
    //     }
    //   }
    //   //When the component is mounted, subscribe to router changes
    //   //and log those page views
    //   router.events.on('routeChangeComplete', handleRouteChange)

    //   // If the component is unmounted, unsubscribe
    //   // from the event with the `off` method
    //   return () => {
    //     router.events.off('routeChangeComplete', handleRouteChange)
    //   }
    // }, [router.events])

    return (
        <React.Fragment>
            <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script id="ga-analytics">
                {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
      `}
            </Script>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired
};
