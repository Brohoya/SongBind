import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { useRouter } from "next/router";
import { User } from "firebase/auth";
import AuthService from "../lib/AuthService";

type IAuthContext = {
    user: User;
    error: string;
    loginWithGoogle: Function;
    loginWithGithub: Function;
    logout: Function;
    setUser: Dispatch<SetStateAction<User>>;
}

const authContext = createContext(null);

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider(props) {
    const [user, setUser] = useState<User>(null);
	const [error, setError] = useState("");
	const router = useRouter()

	const loginWithGoogle = async () => {
		const { user, error } = await AuthService.loginWithGoogle();
		setUser(user ?? null);
		setError(error ?? "");
		router.push('/dashboard');
	};

    const loginWithGithub = async () => {
        const { user, error } = await AuthService.loginWithGithub();
		setUser(user ?? null);
		setError(error ?? "");
		router.push('/dashboard');
    }

	const logout = async () => {
		await AuthService.logout();
		setUser(null);
		router.push('/');
	};
	const value: IAuthContext = { user, error, loginWithGoogle, loginWithGithub, logout, setUser };

	return <authContext.Provider value={value} {...props} />;
}


