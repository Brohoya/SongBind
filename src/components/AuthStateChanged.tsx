import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AuthService from "../service/AuthService";
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
			<main className="app h-full">
				<div className="flex justify-center mx-auto py">
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
