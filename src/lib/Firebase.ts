import { User } from "firebase/auth";
import { doc, DocumentSnapshot, getDoc, getFirestore, writeBatch } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { getSpotifyData, getSpotifyToken } from "./Spotify";



/**
 * Convert a firestore document to JSON
 */
  
export function postToJSON(doc: DocumentSnapshot) {
    const data = doc.data();
    return {
        ...data,
        // Firestore timestamp not serializable to JSON
        createdAt: data?.createdAt.toMillis(),
        updatedAt: data?.updatedAt.toMillis(),
    }
}

/**
 * Import JSON file to firestore data model
 */

export function importFunctionSelector(platform: string, content: string) {
    switch (platform) {
        case 'spotify':
            
            return;
    
        case 'youtube':

            return;
    }
}

/**
 * Spotify content import functions
 */


export async function importPlaylistSpotify(data: any[], user: User, setProgress: Dispatch<SetStateAction<number[]>>) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < data.length; i++) {
            const user_playlists_ref = doc(getFirestore(), "users", user.uid, "playlists", data[i].id); // playlists subcollection inside user
            const playlist_users_ref = doc(getFirestore(), "playlists", data[i].id, "users", user.uid); // users subcollection inside playlist

            const playlistRef = doc(getFirestore(), "playlists", data[i].id);                           // playlist document inside playlists collection
            const playlistData = await (await getDoc(playlistRef)).data();
            const playlistExists = playlistData !== undefined;

            // const access_token = await getSpotifyToken();
            const batch = writeBatch(getFirestore());

            if(!playlistExists) {
                // playlist document inside playlists collection
                batch.set(playlistRef, {
                    id: data[i].id,
                    name: data[i].name,
                    links: {
                        url: data[i].external_urls.spotify,
                        apiUrl: data[i].href,
                    },
                    owner: {
                        name: data[i].owner.display_name,
                        id: data[i].owner.id,
                        links: {
                            url: data[i].owner.external_urls.spotify, 
                            apiUrl: data[i].owner.href
                        },
                    },
                    tracks: {
                        apiUrl: data[i].tracks.href, 
                        total: data[i].tracks.total
                    },
                    public: data[i].public,
                    img: [...data[i].images],
                    origin: 'spotify'
                });
            } else {
                console.log(`Playlist "${data[i].name}" already exists in db`);

                if(playlistData.tracks.total !== data[i].tracks.total) {
                    console.log(`Playlist "${data[i].name}" updated in db`);
                    batch.update(playlistRef, {"tracks": {
                        "total" : data[i].tracks.total,
                    }});
                }
            }
            // playlist subcollection inside user
            batch.set(user_playlists_ref, {id: data[i].id});
            // users subcollection inside playlist
            batch.set(playlist_users_ref, {id: user.uid})
            
            await batch.commit();
            setProgress([i + 1, data.length]);
        }
        console.log("Selected playlists added to db");
        resolve({});
    }).catch(err => {
        console.log("ERROR HAPPENED", err);
    });
}

export async function importSongsSpotify(data: any[], user: User, setProgress: Dispatch<SetStateAction<number[]>>) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < data.length; i++) {
            const added_at = data[i].added_at;
            const song = data[i].track;
            const user_songs_ref = doc(getFirestore(), "users", user.uid, "songs", song.id); // songs subcollection inside user
            const song_users_ref = doc(getFirestore(), "songs", song.id, "users", user.uid); // users subcollection inside song

            const songRef = doc(getFirestore(), "songs", song.id);                           // song document inside songs collection
            const songData = await (await getDoc(songRef)).data();
            const songExists = songData !== undefined;

            const batch = writeBatch(getFirestore());

            if(!songExists) {
                // song document inside songs collection
                batch.set(songRef, {
                    id: song.id,
                    name: song.name,
                    artists: [...song.artists],
                    duration: song.duration_ms,
                    album: {
                        id: song.album.id,
                        name: song.album,
                        artists: [...song.album.artists],
                        total_tracks: song.album.total_tracks,
                        release_date: song.album.release_date,
                        img: [...song.album.images],
                        links: {
                            url: song.album.external_urls.spotify,
                            apiUrl: song.album.href,
                        },
                    },
                    links: {
                        url: song.external_urls.spotify,
                        apiUrl: song.href,
                    },
                    origin: 'spotify'
                });
            } else { console.log(`Song "${song.name}" already exists in db`) }
            // songs subcollection inside user
            batch.set(user_songs_ref, {id: song.id, added_at: added_at});
            // users subcollection inside song
            batch.set(song_users_ref, {id: user.uid, added_at: added_at})
            
            await batch.commit();
            setProgress([i + 1, data.length]);
        }
        
        console.log("Selected songs added to db");
        resolve({});
    }).catch(err => {
        console.log("ERROR HAPPENED", err);
    });
}

export async function importArtistsSpotify(data: any[], user: User, setProgress: Dispatch<SetStateAction<number[]>>) {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < data.length; i++) {
            const user_artists_ref = doc(getFirestore(), "users", user.uid, "artists", data[i].id); // artists subcollection inside user
            const artist_users_ref = doc(getFirestore(), "artists", data[i].id, "users", user.uid); // users subcollection inside artist
    
            const artistRef = doc(getFirestore(), "artists", data[i].id);                            // artist document inside artists collection
            const artistData = await (await getDoc(artistRef)).data();
            const artistExists = artistData !== undefined;
    
            const batch = writeBatch(getFirestore());
    
            if(!artistExists) {
                // artist document inside artists collection
                batch.set(artistRef, {
                    id: data[i].id,
                    name: data[i].name,
                    followers: data[i].followers.total,
                    genres: [...data[i].genres],
                    links: {
                        url: data[i].external_urls.spotify,
                        apiUrl: data[i].href,
                    },
                    img : [...data[i].images],
                    origin: 'spotify'
                });
            } else { console.log(`Artist "${data[i].name}" already exists in db`) }
            // artists subcollection inside user
            batch.set(user_artists_ref, { id: data[i].id });
            // users subcollection inside artist
            batch.set(artist_users_ref, { id: user.uid })
            
            await batch.commit();
            setProgress([i + 1, data.length]);
        }
        console.log("Selected artists added to db");
        resolve({});
    }).catch(err => {
        console.log("ERROR HAPPENED", err);
    });
}



