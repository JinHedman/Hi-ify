import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code){
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    

    useEffect(() => {
        /*
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'},
            body: code,
        };
        fetch('http://localhost:3001/login', requestOptions)
        .then(res => console.log(res.data)).catch(() => window.location = '/')
       */
      // Post code data to https://hiify.herokuapp.com/login
        axios.defaults.baseURL = process.env.APP_URL;
        axios.post('/login',{
            code,
            })
        .then(res => {
            //console.log(res.data)
            //SET TOKENS FROM DATA
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            //CHANGE THE URL TO localhost:3000/
            window.history.pushState({}, null, "/#start")
            })
        .catch(err => console.log(err.response))

    }, [code]) // Want to run the code everytime our code changes
    return accessToken
}