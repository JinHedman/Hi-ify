import StartView from './../views/startView';
// import Dashboard from './../views/dashboard';
// import SelectMembersView from '../views/selectMembersView';
// import useAuth from '../loginAuth'
import SpotifyWebApi from "spotify-web-api-node"
// import { useEffect } from 'react';

const spotifyApi = new SpotifyWebApi({clientId: '2dea7c5ae9e0443791fbeb46a93fd733'})


export default function StartPresenter(props){
    /*
    const accessToken = useAuth(props.code);
    let id = null;
    useEffect(() =>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    if(accessToken){ 
        spotifyApi.getMe()
            .then(function(data) {
                id = data.body.id;
                console.log('Some information about the authenticated user', data.body);
            }, function(err) {
                console.log('Something went wrong!', err);
            });
        }
        if(accessToken){ 
            spotifyApi.getUserPlaylists(id)
                .then(function(data) {
                    console.log('Retrieved playlists', data.body);
                },function(err) {
                    console.log('Something went wrong!', err);
                });
            }
    */

    return <StartView room={props.room}
        database={props.database}
        set_room={(e)=> props.room.set_room_type(e)}   
        generate_host={()=> props.room.generate_host_room(props.database, props.this_user)}
        remove={()=>props.room.remove(props.database)}
    />
}
