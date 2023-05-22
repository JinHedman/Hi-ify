import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios";

const spotifyApi = new SpotifyWebApi({clientId: '2dea7c5ae9e0443791fbeb46a93fd733'})


export default class User{
    constructor(name = null, id = null, image = null, accessToken = null, topTracks = null, topArtist=null){
        this.name = name;
        this.id = id;
        this.image = image;
        this.accessToken = accessToken;
        this.topTracks = topTracks;
        this.topArtist = topArtist;
        this.options = {time_range:"medium_term", limit:5, offset:0};
    }
    get_data(){
        return {
            name : this.name,
            id: this.id,
            image: this.image,
            topTracks: this.topTracks,
            topArtist: this.topArtist,
        }
    }
    setAccessToken(code){
        if(code){
            this.accessToken = code;
            spotifyApi.setAccessToken(this.accessToken);
        }
    }
    setInformation(database){
        return this.accessToken?
            (spotifyApi.getMe()
                    .then((data) => {
                        return database.check_active_users(data.body.id).then((e)=>{
                            if(!e){
                                this.name = data.body.display_name;
                                this.id = data.body.id;
                                this.image = data.body.images;
                            }else{
                                throw new Error("User already active");
                            }
                        })
                    })):new Promise((resolve, reject) => {reject("No access token found!")});

    }
    get_user_top_tracks(){
        if(this.accessToken){ 
            //-- A MANUAL GET CALL WITH AXIOS --//
            /* 
            axios.get(
                    'https://api.spotify.com/v1/me/top/artists', {
                        params: { limit: 20, offset: 0, time_range: 'long-term' },
                        headers: {
                            Accept: 'application/json',
                            Authorization: 'Bearer ' + this.accessToken,
                            'Content-Type': 'application/json',
                        },
                    })
            .then(res => {
                console.log(res.data)
             })
            .catch(err => console.log(err.response))

     
         }else{console.log("No access token found!");}
         */
        spotifyApi.getMyTopTracks(this.options)
            .then((data) => {
                this.topTracks = data.body.items.reduce((ack,cur)=>{
                    return [...ack, cur.id]
                },"");
            },function(err) {
                console.log('Something went wrong!', err);
            });
            
        }
    }
    get_user_top_artists(){
        if(this.accessToken){ 
            spotifyApi.getMyTopArtists(this.options)
                .then((data) => {
                    this.topArtist = data.body.items.reduce((ack,cur)=>{
                        return [...ack, cur.id]
                    },"");
                }, function(err) {
                    console.log('Something went wrong!', err);
                });
            
        }
    }
    get_user_playlists(){
        if(this.accessToken){ 
            //let options = {time_range:"short_term", limit:20, offset:0};

            spotifyApi.getUserPlaylists(this.id)
                .then((data) => {
                console.log('Retrieved playlists', data.body);
                },function(err) {
                console.log('Something went wrong!', err);
                });

            }else{console.log("No access token found!");}
    }
    get_songs_playlist(){
        if(this.accessToken){
        spotifyApi.getPlaylist("7betj6xdDDBtATl8GVZtob")
            .then((data) => {
                console.log('Some information about this playlist', data.body);
            }, function(err) {
                console.log('Something went wrong!', err);
            });
        }
    }
}