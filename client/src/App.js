import './App.css';
import { useEffect, useState } from 'react';

import Room from './models/room';
import SyncModel from './models/firebaseModel';

import StartPresenter from './presenters/startPresenter';
import HashPresenter from './presenters/hashPresenter';
import JoinPresenter from './presenters/joinPresenter';

import SelectMembersPresenter from './presenters/selectMembersPresenter';
import DisplayPlaylistPresenter from './presenters/displayPlaylistPresenter';
import HeaderPresenter from './presenters/headerPresenter';
import AuthView from './views/authView';
import useAuth from "./loginAuth";
  

export default function App(props) {
  const [loggedStatus, setLoggedStatus] = useState(false);
  const code = new URLSearchParams(window.location.search).get('code');
  let accessToken = useAuth(code);
  const [OK, setOK] = useState(false);
  const [userExists, setUserExists] = useState(true);
  //const [OK, setOK] = useState(true); 

  if(accessToken !== props.this_user.accessToken && accessToken !== null){
    //-- SET ACCESS TOKEN --//
    props.this_user.setAccessToken(accessToken);
    //-- GET AND SET USER INFORMATION --//
    
    //console.log(props.this_user.setInformation(props.firebase_connection));
    props.this_user.setInformation(props.firebase_connection).then(() => {
       //-- ADDS ACTIVE USER --//
       props.firebase_connection.add_active_user(props.this_user).then(()=>{
       //-- GET USER PLAYLISTS --//
       //props.this_user.get_user_playlists();
       // -- GET SONGS FROM PLAYLIST --//
       //props.this_user.get_songs_playlist();
       // -- GET TOP SONGS --//
       props.this_user.get_user_top_tracks();
       // -- GET TOP ARTISTS --//
       props.this_user.get_user_top_artists();

       setOK(true);
      })
    }).catch((e) => {
      console.log(e);
      setOK(false);
      setUserExists(false);
    })
      
    
    // .then(() => {
    //                                             props.firebase_connection.check_active_users(props.this_user).then((e)=>
    //                                             {console.log(e); 
    //                                             if(e){OK = false; window.location.reload()}
    //                                             else{OK = true;
    //                                             }
    //                                             props.firebase_connection.add_active_user(props.this_user);
    //                                             //-- GET USER PLAYLISTS --//
    //                                             props.this_user.get_user_playlists();
    //                                             //-- GET SONGS FROM PLAYLIST --//
    //                                             //props.this_user.get_songs_playlist();
    //                                             //-- CANT GET DIS TO WORK D: --//
    //                                             //props.this_user.get_user_top_tracks();
    //                                             })                                 
    //                                             }
    //                                             ).catch((e) => console.log(e));
    
  }
  window.addEventListener("beforeunload", (ev) => 
    {  
      if(OK){
        ev.preventDefault();
        console.log(OK);
        if(OK){props.firebase_connection.remove_active_user(props.this_user);}

        return props.room.room_type === "host"?
        props.room.remove(props.firebase_connection):
        props.room.remove_user(props.firebase_connection, props.this_user);
      }
      
    });

  return !OK?<AuthView userExists={userExists}/>:(<div className="App">
      {/* WITHOUT HEADERS */}
      <HashPresenter hash={["#start"]}><StartPresenter hash="start" room={props.room} this_user={props.this_user} database={props.firebase_connection} code={code}/></HashPresenter>

      <HashPresenter hash={["#join","#create","#display"]}>
        <div className="fullBox">
          <HashPresenter hash={["#join","#create","#display" ]}><HeaderPresenter/></HashPresenter>
          {/* WITH HEADER */}
          <HashPresenter hash={["#join"]}><JoinPresenter room={props.room} this_user={props.this_user} database={props.firebase_connection}/></HashPresenter>
          <HashPresenter hash={["#create"]}><SelectMembersPresenter get_generate_active={() => props.room.get_generate_active()}  room={props.room} this_user={props.this_user} database={props.firebase_connection} /></HashPresenter>
          <HashPresenter hash={["#display"]}><DisplayPlaylistPresenter room={props.room} this_user={props.this_user} database={props.firebase_connection}/></HashPresenter>
        </div>
      </HashPresenter>
    </div>
  );
}