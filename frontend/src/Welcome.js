import React from 'react';

const Welcome = () => {
    const username = localStorage.getItem('username');
    return <h1>Welcome, {username}!</h1>;
};

export default Welcome;