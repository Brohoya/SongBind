import { NextPage } from "next";
import Link from "next/link";
import Loader from "../../components/Loader";
import { UseProtectedRoute } from "../../components/Routing";
import usePlatforms, { IPlatforms } from "../../hooks/usePlatforms";
import Image from "next/image";

const Dashboard: NextPage = () => {
    const {platforms, isLoading}: IPlatforms = usePlatforms();

    return (
        <div className="app">
            <Loader show={isLoading} />

            <div className="flex flex-col justify-center space-y-20">
                <div className="w-full font-bold text-2xl flex flex-row space-x-5 my-auto">
                    <h1 className="my-auto">Platforms : </h1>
                    <ul className="flex flex-row space-x-5 m-0">
                    {isLoading ?
                        <></>
                        :
                        Object.values(platforms).map(platform => {
                            if(platform.connected) return <Platform key={platform.name} platform={platform} />
                        })
                    }
                    </ul>
                </div>


                <div className="w-full font-bold text-2xl border-b-2 border-gray-800 pb-3">Playlists : </div>
                <div className="w-full font-bold text-2xl border-b-2 border-gray-800 pb-3">Top artists : </div>
                <div className="w-full font-bold text-2xl border-b-2 border-gray-800 pb-3">Top songs : </div>
            </div>
        </div>
    );
}

export default UseProtectedRoute(Dashboard);

const Platform = ({ platform }): JSX.Element => {
    return (
        // <li className={'m-0 ring-4 rounded-md ring-gray-700 p-3'}>
            <Link className="m-0 ring-4 rounded-md ring-gray-700 p-3" href={'/platforms'}>
                <button className="my-auto">
                    <Image className="my-auto" src={`/streamingPlatforms/${platform.img}.png`} width={"35"} height={"35"} priority />
                    {/* <img src={`/streamingPlatforms/${img}.png`} alt=""/> */}
                </button>
            </Link>
        // </li>
    );
}





