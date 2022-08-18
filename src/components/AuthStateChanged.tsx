import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AuthService from "../lib/AuthService";
import { Audio } from  'react-loader-spinner'

export default function AuthStateChanged({ children }) {
	const { setUser } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		AuthService.waitForUser((userCred) => {
			setUser(userCred);
			setLoading(false);
		});
	}, []);

	if (loading) {
		return (
			<main className="fixed left-0 right-0 top-0 bottom-0 z-50 backdrop-blur">
                    <div className="flex justify-center my-72">
                        <Audio
                            height="150"
                            width="150"
                            color="gray-600"
                            ariaLabel="audio-loading"
                            wrapperStyle={{}}
                            wrapperClass="wrapper-class"
                            visible={true}
                        />
                </div>
			</main>
		);
	}

	return children;
}
