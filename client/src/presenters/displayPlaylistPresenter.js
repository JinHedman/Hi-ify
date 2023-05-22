import PlaylistView from './../views/playlistView';
import {useEffect, useState} from "react";

export default function DisplayPlaylistPresenter(props){
    const [statelistID, setplaylistID] = useState("");

    useEffect(()=>{
        props.room.addObserver(function(){setplaylistID(props.room.playlistID)});
        return () => {
            props.room.removeObserver(function(){setplaylistID(props.room.playlistID)})
        }
    },[]);

    return <PlaylistView
        playlistID={statelistID}
    />;
}