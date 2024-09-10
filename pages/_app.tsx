import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import Layout from '@/components/Layout/Layout';

import 'react-image-gallery/styles/css/image-gallery.css';
import '../src/themes/stripes/stripes.css';
import themeVariantA from 'src/themes/variant-a-theme';
import themeVariantB from 'src/themes/variant-b-theme';
import themeVariantC from 'src/themes/variant-c-theme';
import themeVariantD from 'src/themes/variant-d-theme';
import themeStripes from 'src/themes/stripes/stripes-theme';
import _ from 'lodash';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const themes = {
    'variant-a': themeVariantA,
    'variant-b': themeVariantB,
    'variant-c': themeVariantC,
    'variant-d': themeVariantD,
    stripes: themeStripes
};

const resolveTheme = pageProps => themes[_.get(pageProps, 'neonData.siteContext.root.attributes.theme')] || theme;

/**
 *
 * @param props
 */
export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <React.Fragment>
            <CacheProvider value={emotionCache}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <ThemeProvider theme={resolveTheme(pageProps)}>
                    <CssBaseline />
                    <Component {...pageProps} />
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
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
