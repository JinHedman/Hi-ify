const API_KEY = "2dea7c5ae9e0443791fbeb46a93fd733";

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id="+API_KEY+"&response_type=code&redirect_uri=https://hiify.herokuapp.com/&scope=streaming%20user-read-email%20user-top-read%20user-read-private%20user-library-read%20user-library-modify%20playlist-modify-private%20playlist-modify-public%20user-read-playback-state%20user-modify-playback-state"


export default function AuthView(){
    return(
        <div className="startWindow">
            <div className="flexCenter">
                <p className="bigText">Hi-ify uses Spotify, please sign in to continue</p>
                <a className="auth startButton" href={AUTH_URL}>Login with Spotify</a>
            </div>
        </div>
    );
}