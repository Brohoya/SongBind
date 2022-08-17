import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import AuthService from "../service/AuthService";

interface IUserContext {
    user: User | undefined | null;
    error: null;
}

const authContext = createContext(null);

export default function useAuth() {
    return useContext(authContext);
}

export function AuthProvider(props) {
    const [user, setUser] = useState(null);
	const [error, setError] = useState("");
	const router = useRouter()

	const loginWithGoogle = async () => {
		const { user, error } = await AuthService.loginWithGoogle();
		setUser(user ?? null);
		setError(error ?? "");
		router.push('/dashboard');
	};

	const logout = async () => {
		await AuthService.logout();
		setUser(null);
		router.push('/');
	};
	const value = { user, error, loginWithGoogle, logout, setUser };

	return <authContext.Provider value={value} {...props} />;
}


