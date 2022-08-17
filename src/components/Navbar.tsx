import Link from "next/link";
import useActivePage from "../hooks/useActivePage";
import useAuth from "../hooks/useAuth";


export default function Navbar() {
    const activePage = useActivePage();
    const auth = useAuth();

    return (
        <nav className="navbar-app">
            <ul className="flex flex-row w-full justify-between">
                {/* Name of the page */}
                <li className="my-auto ml-10">
                    <h1 className="text-2xl text-gray-900">{activePage}</h1>
                </li>
                
                {/* User profile button */}
                <li className="flex flex-row mr-5">
                    <p className="my-auto"> Connected as &nbsp; </p>
                    <Link href={'/profile'}>
                        <div className="userProfile">
                            <img className="w-8 h-8 my-auto mx-1 rounded-3xl" src={auth.user?.photoURL ? `${auth.user.photoURL}` : '/noProfilePic.png'} alt="img"/>
                            <p className="my-auto"> &nbsp; {auth?.user?.displayName?.includes(' ') ? auth?.user?.displayName?.split(' ')[0] : auth?.user?.displayName} &nbsp; </p>
                        </div>
                    </Link>
                </li>
            </ul>

        </nav>
    );
};