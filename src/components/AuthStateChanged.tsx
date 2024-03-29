import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AuthService from "../lib/AuthService";
import { Audio, Bars } from  'react-loader-spinner'

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
			<main className="fixed left-0 right-0 h-full z-50 backdrop-blur">
                {/* <div className="flex justify-center my-72"> */}
                <div className="flex justify-center my-72">
                    <Bars
                        height="150"
                        width="150"
                        color="#333333"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
			</main>
		);
	}

	return children;
}
