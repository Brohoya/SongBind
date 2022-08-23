export const scopes = [
    'ugc-image-upload',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-follow-modify',
    'user-follow-read',
    'user-read-recently-played',
    'user-read-playback-position',
    'user-top-read',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'app-remote-control',
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-modify',
    'user-library-read'
].join(',');

const getData = async (url, access_token) => await fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-type': 'application/json'
    },
}).then(res => res.json());

const getToken = async () => {
    const { access_token } = await fetch('/api/spotify/getToken', {method: 'GET'}).then(res => res.json());
    return access_token;
};

export const getUserPlaylists = async () => {
    const access_token = await getToken();
    const PLAYLISTS_ENDPOINT = `https://api.spotify.com/v1/me/playlists?offset=0&limit=1`;
    const playlist = await getData(PLAYLISTS_ENDPOINT, access_token);

    const playlistTotal = playlist.total;
    const quotient = Math.floor(playlistTotal/50);
    const remainder = playlistTotal % 50;
    let playlists = [];

    if(quotient > 0) {
        var offset = "offset=0";
        for(let i = 0; i < quotient; i++) {
            const data = await getData(`https://api.spotify.com/v1/me/playlists?${offset}&limit=50`, access_token);
            playlists = playlists.concat(data.items)
            offset = `offset=${(i+1) * 50}`;
        };
        const data = await getData(`https://api.spotify.com/v1/me/playlists?${offset}&limit=${remainder}`, access_token);
        playlists = playlists.concat(data.items)
    } else {
        const data = await getData(`https://api.spotify.com/v1/me/playlists?offset=0&limit=${remainder}`, access_token);
        playlists = playlists.concat(data.items)
    };

    return playlists;
}

export const getSavedSongs = async () => {
    const access_token = await getToken();
    const SAVED_SONGS_ENDPOINT = `https://api.spotify.com/v1/me/tracks?offset=0&limit=1`;
    const song = await getData(SAVED_SONGS_ENDPOINT, access_token);

    const totalSongs = song.total;
    const quotient = Math.floor(totalSongs/50);
    const remainder = totalSongs % 50;
    let songs = [];

    if(quotient > 0) {
        var offset = "offset=0";
        for(let i = 0; i < quotient; i++) {
            const data = await getData(`https://api.spotify.com/v1/me/tracks?${offset}&limit=50`, access_token);
            songs = songs.concat(data.items);
            offset = `offset=${(i+1) * 50}`;
        };
        const data = await getData(`https://api.spotify.com/v1/me/tracks?${offset}&limit=${remainder}`, access_token);
        songs = songs.concat(data.items);
    } else {
        const data = await getData(`https://api.spotify.com/v1/me/tracks?offset=0&limit=${remainder}`, access_token);
        songs = songs.concat(data.items);
    };

    return songs;
}

export const getFollowedArtists = async () => {
    const access_token = await getToken();
    const artist = await getData('https://api.spotify.com/v1/me/following?type=artist&limit=1', access_token);
    
    var totalArtists = artist.artists.total;
    var quotient = Math.floor(totalArtists/50);
    var remainder = totalArtists % 50;
    var artists = [];

    if(quotient>0) {
      var lastArtist = "";
      for(let i = 0; i < quotient; i++) {
        const data = await getData(`https://api.spotify.com/v1/me/following?type=artist&limit=50${lastArtist}`, access_token);
        artists = artists.concat(data.artists.items);
        lastArtist = "&after=" + data.artists.cursors.after;
      };
      const data = await getData(`https://api.spotify.com/v1/me/following?type=artist&limit=${remainder+lastArtist}`, access_token);
      artists = artists.concat(data.artists.items);
    } else {
      const data = await getData(`https://api.spotify.com/v1/me/following?type=artist&limit=${remainder}`, access_token);
      artists = artists.concat(data.artists.items);
    };

    return artists;
}
