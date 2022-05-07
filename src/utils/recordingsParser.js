//parses MusicBrainz API response for requierd data


//extracts only valid songs from recordings array
const formatList = (recordsArray) => {
  let formattedList = [];
  let elementToPush = [];

  recordsArray.map(element => {
    if (element.length) {
      element.map(song => {
        if (!formattedList.includes(song)) {
          elementToPush = song;
          elementToPush.isSong = true;
        }
      });
    }

    elementToPush.word = element.word;

    formattedList.push(elementToPush);
    elementToPush = [];
  });

  return formattedList;
};

// extracts artists from appropriate field
const formatArtists = (artistArray) => {
  let formattedArtists = "";
  artistArray.map((artst, index) => {
    formattedArtists += artst.name;
    if (artistArray[index + 1])  formattedArtists += " & ";
  });

  return formattedArtists;
};

//looks up the album if there is one
const formatAlbum = (releasesArray) => {
  let relGroup = [];
  let albumTitle = "";

  releasesArray.map(rel => {
    if (rel["release-group"]) {
      relGroup = rel["release-group"];
      if (relGroup["primary-type"] === "Album")  albumTitle = relGroup.title;
    }
  });

  return albumTitle;
};

//extracts only required data to display
const formatSong = (rawSong) => {
  let formattedSong = [];

  formattedSong.word = rawSong.word;

  if (rawSong.isSong) {
    formattedSong.artist = rawSong["artist-credit"] ? formatArtists(rawSong["artist-credit"]) : "";
    formattedSong.album = rawSong.releases ? formatAlbum(rawSong.releases) : "";
    formattedSong.title = rawSong.title ? rawSong.title : "";
  }
  else  formattedSong.notFound = true;

  return formattedSong;
};

export default { formatList, formatSong };