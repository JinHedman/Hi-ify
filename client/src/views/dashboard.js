import React from 'react';
import useAuth from '../Auth';

export default function Dashboard({code}) {
        const accessToken = useAuth(code)
    return( 
        <a>{code}</a>
    )
}