import JoinView from '../views/joinView';
import JoinView2 from '../views/joinView2';
import MembersView from '../views/membersView';
import { useEffect, useState } from "react";



function JoinPresenter(props){
    const [joined, setJoined] = useState(false);
    const [connectedMembers, setMembers] = useState(props.room.users);

    useEffect(()=>{
        props.room.addObserver(function(){setMembers(props.room.users)});
        return () => {
            props.room.removeObserver(function(){setMembers(props.room.users)})
        }
    },[]);

    let searchQuery = "";
    return joined?
        <div className="startWindow">
            <div className="flexCenter">
                <JoinView2 number={props.room.room_number}/>
                <MembersView members={connectedMembers}/>
            </div>
        </div>
    :
     <JoinView 
        onText={input => searchQuery = input}
        find_room={() => props.room.find_room(props.room, props.this_user, props.database, searchQuery).then(() => {setJoined(true); console.log("JOINED")}).catch((e) => console.log(e))}/>
}
export default JoinPresenter;

