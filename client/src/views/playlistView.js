export default function PlaylistView(props){
    return(
        <div className="startWindow">
            <div className="flexCenter">
                <h1 className="bigText">Here you go! A Fresh Playlist</h1>
                <p className="smallText">Play it here or open it in Spotify</p>
                <iframe src={(props.playlistID)?"https://open.spotify.com/embed/playlist/"+props.playlistID+"?utm_source=generator":""} width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            </div>
        </div>
    );
}
