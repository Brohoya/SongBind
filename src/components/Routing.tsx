import { useRouter } from "next/router";
import React from "react";
import useAuth from "../hooks/useAuth";

export function UsePublicRoute(Component) {
	return function PublicRoute(props) {
		const auth = useAuth();
		const router = useRouter();

		if (auth.user) {
			router.replace("/");
			return <h1>Loading...</h1>;
		}
		return <Component auth={auth} {...props} />;
	};
}

export function UseProtectedRoute(Component) {
	return function ProtectedRoute(props) {
		const auth = useAuth();
		const router = useRouter();

		if (!auth.user) {
			router.push("/");
			return <h1>Loading...</h1>;
		}
		return <Component auth={auth} {...props} />;
	};
}
