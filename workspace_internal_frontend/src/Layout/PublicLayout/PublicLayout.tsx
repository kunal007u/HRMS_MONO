import React, { PropsWithChildren } from 'react';

interface IPublicLayoutProps extends PropsWithChildren {
    children: React.ReactElement | React.ReactElement[];
}

const PublicLayout: React.FC<IPublicLayoutProps> = React.memo(({ children }) => {
    return children as JSX.Element;
});

export default PublicLayout;
