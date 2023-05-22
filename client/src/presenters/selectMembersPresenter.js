import { useEffect, useState } from "react";
import SelectMembersView from "../views/selectMembersView";
import MembersView from "../views/membersView";

export default function SelectMembersPresenter(props){
    const [connectedMembers, setMembers] = useState(props.room.users);

    // useEffect(()=>{
    //     console.log(props.room.users.length);
    //     setMembers(props.room.users);
    // },[props.room.users]);


    useEffect(()=>{
        props.room.addObserver(function(){setMembers(props.room.users)});
    },[]);

    return (
        <div className="startWindow">
            <div className="flexCenter">
                <SelectMembersView 
                    get_generate_active={() => props.get_generate_active()}
                    generate={()=> (props.room.get_Recommendations(props.this_user.accessToken).then(()=>props.room.notifyObservers()),window.location.hash = "display")}
                    room={props.room} 
                    this_user={props.this_user} 
                    database={props.firebase_connection}
                    >
                    <MembersView members={connectedMembers}/>    
                </SelectMembersView>
            </div>
        </div>
    )
}
