HOW TO RUN LOCALLY:
If you want to run the application locally you have to be inside the Hi-ify main folder and cd into the client subfolder, you then run "npm start".
After you have to open a second terminal, cd into the server subfolder and run the command "node server.js".
The application requires some node_modules to run though and also a firebaseConfig both which are in the gitignore and therefore not included in the repository!

SHORT DESCRIPTION:
Our project is simple web application to let users generate custom Spotify playlists based on multiple peoples music preferences, it will base it on attributes such as genre and artists. 

We use the Spotify API to get this information about the users. One user will create a room, and other users will authenticate themselves on separate devices and will show up in the room, and they will be visible for the the creator and the joined users.

from the this the creator of the room can generate a playlist. that can be saved to Spotify.


WHAT WE HAVE DONE:
Came up with structure for app.

Sreated the skeleton for the app as in the all the views and presenters that will be used. 

Created a CSS design for the site.

navigation with window.location.hash

researched in Spotify API and how to implement it correctly + did authentication with Spotify.


WHAT WE PLAN TO DO:
let a user create a room

Set up a working system for adding users to the room. using a code.

We are trying right now to figure out how to use access tokens from Spotify web api form


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





