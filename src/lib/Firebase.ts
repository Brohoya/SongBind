import { User } from "firebase/auth";
import { DocumentSnapshot } from "firebase/firestore";



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

export function importPlaylistsSpotify(data: JSON, uid: User): void {


}

export function importSongsSpotify(data: JSON, uid: User): void {


}

export function importArtistsSpotify(data: JSON, uid: User): void {


}