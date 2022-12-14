import React from 'react';
import { LayoutProvider } from '@/layout/context/layoutcontext';
import Layout from '@/layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/styles/layout/layout.scss';
import '@/styles/demo/Demos.scss';

export default function MyApp({ Component, pageProps }) {
    if (Component.getLayout) {
        return (
            <LayoutProvider>
                {Component.getLayout(<Component {...pageProps} />)}
            </LayoutProvider>
        )
    } else {
        return (
            <LayoutProvider>
                <Layout>
                    <Head>
                        <link id="theme-css" href={`${contextPath}/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
                    </Head>
                    <body>
                        <Main />
                        <NextScript />
                    </body>
                    <Component {...pageProps} />
                </Layout>
            </LayoutProvider>
        );
    }
}
