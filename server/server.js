require("dotenv").config();
const express = require('express');
const cors = require("cors");
// Web-api which makes handling spotify web api easier 
const SpotifyWebApi = require('spotify-web-api-node');
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

app.post('/login', (req, res) =>{
    // The code that's returned as a query parameter to the redirect URI
    const code =  req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    })
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})
app.get("/",(req,res)=>{
    res.send("Hello world!")
})