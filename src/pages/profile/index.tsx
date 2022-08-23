import { NextPage } from "next";
import { UseProtectedRoute } from "../../components/Routing";
import useAuth from "../../hooks/useAuth";
import Image from "next/image";
import Logout from '../../assets/webapp/profile/logout.svg';

const UserProfilePage: NextPage = () => {
    const auth = useAuth();

    return (
        <main className="main">
            <div  className="w-6/12 flex flex-col space-y-5 ring-2 ring-slate-700 rounded-3xl mx-auto my-20 content-center px-40 py-20">
                <div className="flex flex-row">
                    <img className="w-8 h-8 my-auto mx-3 rounded-3xl" src={auth.user?.photoURL ? `${auth.user.photoURL}` : '/noProfilePic.png'} alt="img" referrerPolicy="no-referrer" />
                    <h1 className="text-xl font-bold text-center my-auto">{auth.user?.displayName}&apos;s profile page </h1>
                </div>
                <br />
                <br />
                <div className="flex flex-col space-y-3 w-8/12 mx-auto">
                    <LogoutButton />
                </div>
            </div>
        </main>
  );
};

export default UseProtectedRoute(UserProfilePage);

const LogoutButton = () => {
    const {logout} = useAuth()

    return (
        <button className='' onClick={() => logout()}>
            <div className="flex flex-row my-auto font-bold ring-4 ring-gray-800 hover:ring-offset-1 transition-all delay-50 ease-linear p-2 rounded-lg justify-center">
                <Image src={Logout} width={25} height={25} />
                &nbsp; Logout
            </div>
        </button>
    );
}