import getConfig from 'next/config';
import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    return (
        <div className="layout-footer">
            <img src={`https://educa360beta-assets.educa360.net/files/5b9d063a-787c-4809-b2ba-6bf30a970057.png`} alt="Logo" height="20" className="mr-2" />
            by
            <span className="font-medium ml-2">EDUCA Team</span>
        </div>
    );
};

export default AppFooter;
