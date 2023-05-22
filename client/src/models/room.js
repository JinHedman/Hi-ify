import SpotifyWebApi from "spotify-web-api-node"
const spotifyApi = new SpotifyWebApi({clientId: '2dea7c5ae9e0443791fbeb46a93fd733'})


export default class Room{
    //-- CONSTRUCTOR --//
    constructor(){
        this.users = [];
        this.testdata = null;

        this.room_number = 9999;

        this.observers = [];
        this.room_type = null;

        this.seedTracks = [];
        this.generatedPlaylist = [];
        this.playlistID = "";
    }

    //-- RETRIVE DATA --//
    get_data(){
        const data ={
            number: this.room_number,
            users: this.users,
            //seedTracks: this.seedTracks,
            //seedArtist: this.seedArtist,
        }
        return data;
    }

    //-- INT GEN WITHOUT DUPLICATES --//
    get_num_list(len, size){
        let nums = [];
        while(nums.length < len){
            const num = Math.floor(Math.random() * size);
            if (!nums.includes(num)){
                nums = [...nums , num];
            }
        }
        return nums;
    }

    //-- GET SEED SONGS AND TRACKS --//
    get_songs(){
        const nums = this.get_num_list(3,5);
        for(let i = 0; i < 3; i ++){
            let songs = [];
            this.users.forEach((element, index) => {
                //const el = Math.floor(Math.random() * 2) === 0?true:false?element.topArtist[nums[index]]:element.topSongs[nums[index]];
                songs = [...songs, element.topTracks[nums[i]]]
            });
            this.seedTracks[i] = songs;
        }
        
        // let songs = [];
        // this.users.forEach(user => songs=[...songs, ...user.topTracks]); 
        // //console.log(nums);
        // //console.log(songs);
        // songs = nums.map(i=>songs[i]);
        // console.log(songs);
        // this.seedTracks = songs;
    }
    
    /*-- GET RECOMMENDATIONS --*/
    
    get_Recommendations(accessToken){
        this.generatedPlaylist = [];
        this.playlistID = "";
        this.get_songs();

        spotifyApi.setAccessToken(accessToken);
        if(accessToken){
            return spotifyApi.getRecommendations({
                min_energy: 0.4,
                //seed_artists: ,
                seed_tracks: this.seedTracks[0],
                min_popularity: 50,
                limit:8})
            .then((data)=>{
                this.generatedPlaylist = [...data.body.tracks];
                console.log(this.generatedPlaylist);
                return spotifyApi.getRecommendations({
                    min_energy: 0.4,
                    //seed_artists: ,
                    seed_tracks: this.seedTracks[1],
                    min_popularity: 50,
                    limit:8})
                })
            .then((data)=>{
                this.generatedPlaylist = [...this.generatedPlaylist,...data.body.tracks]
                return spotifyApi.getRecommendations({
                    min_energy: 0.4,
                    //seed_artists: ,
                    seed_tracks: this.seedTracks[2],
                    min_popularity: 50,
                    limit:8})
                })
            .then((data)=>{
                this.generatedPlaylist = [...this.generatedPlaylist,...data.body.tracks];
                this.generatedPlaylist = this.generatedPlaylist.reduce((ack,cur)=>{
                    return [...ack, cur.uri]
                },"");

            },  (err)=>{console.log("Something went wrong (Getting songs URI)!", err);}
            ).then(()=>{
                return spotifyApi.createPlaylist('Test playlist', { 'description': 'Hi-ify generated playlist with:', 'public': true })
                .then((data)=>{
                    console.log('Created playlist!');
                    this.playlistID = data.body.id;
                }, function(err) {
                    console.log('Something went wrong (Creating playlist stage)!', err);
                }).then(()=>{
                    return spotifyApi.addTracksToPlaylist(this.playlistID, this.generatedPlaylist)
                        .then((data)=>{
                            console.log('Added tracks to playlist!');
                        }, function(err) {
                            console.log('Something went wrong (Adding tracks to playlist stage)!', err);
                        });
                });
            })
        }
        //+this.users.forEach(user=> {return user["name"]})
    }
    
    //-- ROOM METHODS --//
    remove(database){
        if(this.room_type === "host"){
            database.remove(this);
            this.users=[];
            this.room_number = 9999;
            this.observers = [];
        }
    }
    remove_user(database, user){
        database.remove_user(user, this.room_number);
    }
    set_room_type(type){
        this.room_type = type;
    }
    set_room_number(number){
        this.room_number = number;
    }
    generate_host_room(database, this_user){
        console.log(this.room_type);
        if(this.room_number === 9999 || this.room_type === "participator"){
            this.room_number = Math.floor(Math.random() * 8999) + 1000;
            this.set_room_type("host");
            database.create_room(this, this_user);

        }
    }
    find_room(room, user, database, number){
        console.log("testpromiselogg");
        return database.find_room(room, user, number).then(() => {this.room_number = parseInt(number); this.notifyObservers()});
    }
    get_generate_active(){
        if(this.users.length > 1 && this.users.length < 6){
            return true;
        }
        return false;
    }

    /*--OBSERVER METHODS--*/
    addObserver(callback){
        this.observers = [...this.observers,callback]
    }
    removeObserver(callback){
        this.observers = this.observers.filter(obs => obs !== callback)
    }
    notifyObservers(){
        try{
            this.observers.forEach(function(cb){cb()})
        }catch(error){console.error(error)};
        
    }

}
