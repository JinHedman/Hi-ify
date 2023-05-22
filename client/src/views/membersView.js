// import { useState } from "react";
// import User from "../models/user";

function MembersView(props){
    
    return (
        <div className="flexRow memberView">
            {props.members.map((user)=>(
                (user["image"] !== undefined)?
                <img key={user.id} src={user.image[0].url} className="profileImg"alt="Profile" ></img>

                :
                <img key={user.id} src="https://ilonasomerla.myduolife.com/images/img-profile.png" className="profileImg"alt="Profile" ></img>
            
                
            ))}
            
        </div>
    );  
}
export default MembersView;

{/* <div className="profileBox">
                    <img key={user.id} src={user.image[0].url} className="profileImg"alt="Profile image" ></img>
                    <p key={"p" + user.id} className="profileText">{user.name}</p>
                </div>
                :
                <div className="profileBox">
                    <img key={user.id} src="https://ilonasomerla.myduolife.com/images/img-profile.png" className="profileImg"alt="Profile image" ></img>
                    <p key={"p" + user.id} className="profileText">{user.name}</p>
                </div> */}