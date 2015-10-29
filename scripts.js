var playSound = function(trackTitle) {
    SC.get('/tracks',
    {
        q: trackTitle, 		//q is a search param that will search all fields with trackTitle
    }

    , function(tracks) {
    	console.log(tracks)
        //var ranNum = Math.floor(Math.random() * 9); 		//generate random number 1-50 (0 based index)
        SC.oEmbed(tracks[0].uri, { 
        	auto_play: true,
      		maxheight: 130,
      		iframe: true,	//ensures the html5 player and not flash player
      		

        	


         }, document.getElementById('target')); 	//placing the widget in our target div
    	
    });
}

window.onload = function() {
    SC.initialize({
        client_id: 'c25c8b434c58d7431980c06ffde425f0'
    });

    playSound('californication')


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