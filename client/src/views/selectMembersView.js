import Room from "../models/room";


function SelectMembersView(props){
    return (
        <>
            <div className="flexRow">
                <div className="numberBox">{props.room.room_number.toString()[0]}</div>
                <div className="numberBox">{props.room.room_number.toString()[1]}</div>
                <div className="numberBox">{props.room.room_number.toString()[2]}</div>
                <div className="numberBox">{props.room.room_number.toString()[3]}</div>
            </div>
            <p className="bigText">A room has been created, let your friends join with the code above</p>
            <p className="smallText">To join, connect on a separate device, press the "JOIN ROOM" button and enter the code.</p>
            <>{props.children}</>
            <button type="submit" disabled={!props.get_generate_active()} onClick={() => props.generate()} className={(!props.get_generate_active()?"startButton disabled":"startButton generate")}>Generate Playlist</button>
        </>
    )
}
export default SelectMembersView;