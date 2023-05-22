// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from './firebaseConfig';
import 'firebase/compat/database';


export default class SyncModel{
	constructor(){
	}
	//PARTICIPATOR
	find_room(room, user, number){
		
		const REF= "room"+number;

		return firebase.database().ref("rooms/" + REF).once("value").then(snapshot => {
			if (snapshot.exists()){
				this.add_user(room, user, REF)
				this.setup_connection(room, REF);
			}else{
				throw new Error("No room found");
			}
		});
	}
	add_user(room, user, REF){
		firebase.database().ref("rooms/"+REF+"/users").update({  // object literal
			[user.id]:user.get_data()
		})
	}
	setup_connection(room, REF){
		firebase.database().ref("rooms/" + REF).on("value", function(data){
			let loadingFromFirebase= true;
			try{
				if(data.val()){
					room.users = Object.values(data.val().users);
					room.notifyObservers();
				} 
			}catch(e){ console.log(e); }finally{ loadingFromFirebase= false;}
		});
	}
	remove_user(user, number){
		const REF= "rooms/room"+number;
		firebase.database().ref(REF+"/users/"+user.id).remove();
	}
	//HOST
	create_room(room, user){
		const REF = "room"+room.room_number;
		firebase.database().ref("rooms").update({  // object literal
			[REF]:room.get_data()
		}).then(()=>{
			this.add_user(room, user, REF);
			this.setup_connection(room, REF);
		}).catch(e => {console.log(e)})
	}
	remove(room){
		const REF = "rooms/room"+room.room_number;
		firebase.database().ref(REF).remove();
	}
	//ACTIVE USER MANAGEMENTS
	add_active_user(user){
		return firebase.database().ref("active_users").update({  // object literal
			[user.id]:user.id
		})
	}
	remove_active_user(user){
		firebase.database().ref("active_users/"+user.id).remove();
	}
	check_active_users(id){
		console.log(id);
		return firebase.database().ref("active_users").once("value").then(snapshot => {
			return snapshot.hasChild(id);
		});
	}
	
} 

