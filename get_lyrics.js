    var songTitle = "";
    var songArtist = "";
    var fullLyrics = "";
    var lyricsArray = [];

    $.ajax({
        method: "GET",
        dataType: "jsonp",
        url: "http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?apikey=4f5c184fb5ac5258f07c13f656f07208&format=jsonp&",
        data: "q_track=" + songTitle + "&q_artist=" + songArtist,
        success: function(json){
            fullLyrics = json.message.body.lyrics.lyrics_body;
            lyricsArray = fullLyrics.split("\n");
            console.log(lyricsArray);
            return lyricsArray;
        }
    });
