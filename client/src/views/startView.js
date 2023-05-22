//import LoggedInButtons from './loggedInButtons';
const API_KEY = "2dea7c5ae9e0443791fbeb46a93fd733";

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id="+API_KEY+"&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


function StartView(props){
    return(
        <div className="startWindow">
            <div className="flexCenter">
                <h1 className="title">Hi-ify</h1>
                <p className="undertitle">Create collective playlists</p>
                <a onClick={() => {window.location.hash = "#create";  props.generate_host()}} className="startButton get">Create Room</a>
                <a onClick={() => {window.location.hash = "#join"; props.remove(); props.set_room("participator")}} className="startButton login">Join Room </a>
            </div>
        </div>
    );
}
export default StartView;