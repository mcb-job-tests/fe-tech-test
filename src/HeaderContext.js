import React from 'react';

export const HeaderContext = React.createContext({
    header: 'Events',
    setHeader: () => {},
});