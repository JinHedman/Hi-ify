// import { useState } from "react";
import ReactCodeInput from "react-code-input";

function JoinView(props){
    
    return (
        <div className="startWindow">
            <div className="flexCenter">
                {/*<input onInput={e => props.onText(e.target.value)}className="inputBox" maxLength="4" required placeholder="0000"></input>*/}
                <p className="bigText join">Please Insert The Room Code</p>
                <ReactCodeInput onChange={e => {props.onText(e);}} fields={4} {...props}/>

                <button type="submit" onClick={props.find_room} className="startButton code">Join Room</button>
            </div>
        </div>
    );  
}
export default JoinView;
