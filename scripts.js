var playSound = function(genre) {
    SC.get('/tracks', {
        genres: genre, 		//passing user's genre param 
        bpm: {
            from: 100 		//searching tracks only higher than 100bpm for test
        }


        //tracks returns as an array - default 50 items
        //pass tracks into function and randomly selecting one of the 50
    }, function(tracks) {
        var ranNum = Math.floor(Math.random() * 9); 		//generate random number 1-50 (0 based index)
        SC.oEmbed(tracks[ranNum].uri, { auto_play: true }, document.getElementById('target')); 	//placing the widget in our target div?
    	
    });
}

window.onload = function() {
    SC.initialize({
        client_id: 'c25c8b434c58d7431980c06ffde425f0'
    });


// there is an error in the looping logic below
    var menuLinks = document.getElementsByClassName('genre'); 	//grabbing links with genre class
    for (var i = 0; i < menuLinks.length; i++) { 	//looping through list to create click handlers
        var menuLink = menuLinks[i];
        menuLink.onclick = function(e) {
        	e.preventDefault();  		//need this not sure why 
        	playSound(menuLink.innerHTML); 		//invoke our function and pass it the innerHTML of DOM element, (the text in the links)
        }
    }
};


/////////Sample code to embed Soundcloud User    WORKS

// // initialize soundcloud API with key
// SC.initialize({
//     // This is the sample client_id. you should replace this with your own
//     client_id: 'c25c8b434c58d7431980c06ffde425f0'
// });

// function embed (id) {
//   SC.oEmbed("http://soundcloud.com/" + id // user or playlist to embed
//     , { color: "ff0066"
//       , auto_play: true
//       , maxwidth: 500
//       , maxheight: 1000
//       , show_comments: true } // options
//     , document.getElementById('target') // what element to attach player to
//   );
// }

// $(document).ready(
//   function () {
//     embed("ic4rus");
//   }
// );