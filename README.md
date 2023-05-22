**HOW TO RUN LOCALLY:**
If you want to run the application locally you have to be inside the Hi-ify main folder and cd into the client subfolder, you then run "npm start".
After you have to open a second terminal, cd into the server subfolder and run the command "node server.js".
The application requires some node_modules to run though and also a firebaseConfig both which are in the gitignore and therefore not included in the repository!

**SHORT DESCRIPTION:**
Our project is simple web application to let users generate custom Spotify playlists based on multiple peoples music preferences, it will base it on attributes such as genre and artists. 

We use the Spotify API to get this information about the users. One user will create a room, and other users will authenticate themselves on separate devices and can then join the room with a three digit code. Users in the same room will see each others profile pictures and can generate a mixed playlist from all users music taste. This Playlist is saved as a playlist for the host of the room.


**WHAT WE HAVE DONE:**
Came up with structure for app.

Created the skeleton for the app as in the all the views and presenters that will be used. 

Created a CSS design for the site.

navigation with window.location.hash

researched in Spotify API and how to implement it correctly + did authentication with Spotify.

let a user create a room

Set up a working system for adding users to the room using a code.


**WHAT WE PLAN TO DO:**
Add so that users can choose playlist to "contribute" to the generated mix
Add so that users in the room can also save the generated playlist and not just the 

YOUR PROJECT FILE STRUCTURE:

client
	public
		index.html
	src
		(index.js, index.css, app.js(links to presenters, creates structure), useAuth.js (fetches access-, refresh-, expires-tokens from server))

		presenters
			(all presenters)
		views
			(all views)
		models
			(models)
		
server
	(server.js (a simple local server for testing which generates access-, refresh-, expires-tokens))




