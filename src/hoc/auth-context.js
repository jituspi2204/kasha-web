import React from 'react';

const authContext = React.createContext(
    {
        isLoggedIn : false,
        logoutHandler : () => {},
        loginStateHandler : () => {},
        ownerLoginHandler : () => {},
        ownerLogoutHandler : () => {},
        photo: '',
        userType : 'customer',

    }
);

export default authContext;