import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React from 'react';
import AppConfig from '@/layout/AppConfig';

const NotFoundPage = () => {
    return (
        <div className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div className="flex flex-column align-items-center justify-content-center">
                404 Error

            </div>
        </div>
    );
};

NotFoundPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig />
            <Head>
                    <link id="theme-css" href={`${contextPath}/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
        </React.Fragment>
    );
};

export default NotFoundPage;
