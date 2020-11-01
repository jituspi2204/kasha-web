import React from 'react';

const hotelContext = React.createContext({
    hotelsList : [],
    totalPages:()=>{}
});

export default hotelContext;