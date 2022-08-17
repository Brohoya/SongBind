import { getApp,  } from "firebase/app";
import {
	signInWithPopup,
	getAuth,
	GoogleAuthProvider,
    GithubAuthProvider,
	signOut,
	onAuthStateChanged,
    User,
} from "firebase/auth";
import { getDoc, doc, getFirestore, setDoc } from "firebase/firestore";


class AuthService {
    auth: any;
    constructor(firebaseApp) {
        this.auth = getAuth(firebaseApp);
    }

    waitForUser(callback) {
        return onAuthStateChanged(this.auth, (userCred) => {
            callback(userCred);
        });
    }

    async userExist (uid: string) {
        // console.log(uid);
        const userDoc = await getDoc(doc(getFirestore(), "users", uid));
        // console.log('function', userDoc);
        return userDoc.exists();
    }

    async createUserDoc(user: User) {
        const docExists = await this.userExist(user.uid);
        if(!docExists) {
        try{
            const userDoc = await setDoc(doc(getFirestore(), "users", user.uid), {
            displayName: user.displayName,
            username: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            uid: user.uid,
            connectedPlatforms: {},
            });
            console.log("User document created with ID: ", user.uid);
        } catch(e) {
            console.error("Error adding document: ", e);
        };
        } else {
        console.log("User already exists in database");
        };
        return {user: user, error: null};
    }

    async loginWithGoogle () {
        return await signInWithPopup(this.auth, new GoogleAuthProvider())
            .then(async ({user}) => this.createUserDoc(user))
            .catch((e) => {
                console.error(e);
                return {user: null, error: e}
            });
    }

    async loginWithGithub () {
        return await signInWithPopup(this.auth, new GithubAuthProvider())
        .then(async ({user}) => this.createUserDoc(user))
        .catch((e) => {
            console.error(e);
            return {user: null, error: e}
        });
    }

    async logout() {
        await signOut(this.auth);
    }
}

export default new AuthService(getApp());
