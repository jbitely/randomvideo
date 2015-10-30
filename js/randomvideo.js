var makeVideo = function() { // Wrapper for fetching song, lyrics, and images

    var songTitle = $('#title').val(); // User input song title
    var songArtist = $('#artist').val(); // User input song artist
    var fullSearch = songArtist + " " + songTitle; // Single search term for Giphy api
    var fullLyrics = ""; // Lyrics string returned by Musixmatch api
    var lyricsArray = []; // Array of strings. Each index is a string containing one line of lyrics

    $('body').scrollTo('#gifs'); // Scroll to the gif display div when we begin making a new video

    // SoundCloud call and embedding
    var playSound = function(trackTitle) {
        SC.get('/tracks', {
                q: trackTitle, //q is a search param that will search all fields with trackTitle
            },
            function(tracks) {
                SC.oEmbed(tracks[0].uri, {
                    auto_play: true,
                    maxheight: 130,
                    iframe: true, //ensures the html5 player and not flash player
                }, document.getElementById('target')); //placing the widget in our target div
            });
    };

    // Query Musixmatch for lyrics; on success query Giphy with lyrics and display gifs on page
    $.ajax({
        method: "GET",
        dataType: "jsonp",
        url: "http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=4f5c184fb5ac5258f07c13f656f07208&format=jsonp&",
        data: "q_track=" + songTitle + "&q_artist=" + songArtist,
        success: function(json) {   // If lyrics successfully fetched, split them into an array and pass the array to the Giphy code
            fullLyrics = json.message.body.lyrics.lyrics_body;
            lyricsArray = fullLyrics.split("\n");
            var lyricsHandler = {
                currentWord: songArtist,
                line: 0,
                reset: function() {  //used when a new song is playing to reset  the object back to stock
                    this.currentWord = songArtist;
                    this.line = 0;
                }
            };
            var lyricsSetter = function(obj) {
                var currentLine = lyricsArray[obj.line].split(' '); // Split off a single line from the lyrics array
                obj.currentWord = currentLine[Math.floor(Math.random() * currentLine.length)] + " " + currentLine[Math.floor(Math.random() * currentLine.length)]; //randomly select two words from currentLine
                if (obj.line === lyricsArray.length - 2) { // if the last line is accessed, restart
                    obj.line = 0;
                }
                obj.line++;
            };
            var picLoader = function() { // Query Giphy for an image based on the current random words and display it on the page
                request = new XMLHttpRequest;
                request.open('GET', 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + lyricsHandler.currentWord, true);
                request.onload = function() {
                    if (request.status >= 200 && request.status < 400) {
                        data = JSON.parse(request.responseText).data.image_url;
                        if (data != undefined) {
                            document.getElementById("giphyme").innerHTML = '<center><img src = "' + data + '"  title="GIF via Giphy"></center>';
                        }
                    } else {
                        console.log('reached giphy, but API returned an error');
                    }
                };
                request.onerror = function() {
                    console.log('connection error');
                };
                request.send();
            };

            picLoader(); // Call picLoader immediately to show an artist gif
            window.setInterval(function() { // run lyricsSetter every 5 seconds
                lyricsSetter(lyricsHandler);
            }, 5000);
            window.setInterval(picLoader, 5000); // run picLoader every 5 seconds
        }
    });

    SC.initialize({ // initialize the SoundCloud player with authorization
        client_id: 'c25c8b434c58d7431980c06ffde425f0'
    });

    playSound(fullSearch); // play the song requested by the user
};

// Prevent default search button behavior
$("#searchForm").submit(function(e) {
    e.preventDefault();
});

// scrollTo plugin https://github.com/flesler/jquery.scrollTo
$.fn.scrollTo = function(target, options, callback) {
    if (typeof options == 'function' && arguments.length == 2) {
        callback = options;
        options = target;
    }
    var settings = $.extend({
        scrollTarget: target,
        offsetTop: 50,
        duration: 500,
        easing: 'swing'
    }, options);
    return this.each(function() {
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({
            scrollTop: scrollY
        }, parseInt(settings.duration), settings.easing, function() {
            if (typeof callback == 'function') {
                callback.call(this);
            }
        });
    });
};
