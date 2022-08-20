import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { RotatingLines } from "react-loader-spinner";
import { UseProtectedRoute } from "../../components/Routing";
import usePlatforms, { IPlatforms } from "../../hooks/usePlatforms";


const Platforms: NextPage = () => {
    const {platforms, isLoading}: IPlatforms  = usePlatforms();

    // if(!isLoading) console.log(platforms);
    
    return (
        <div className="app">
            <div className="mx-auto">
                <h1 className="text-center font-bold text-3xl">Connect your platforms : </h1>
                <ul className="flex flex-col space-y-5 mt-10 w-6/12 mx-auto">
                    {isLoading ?
                        <></>
                        :
                        Object.values(platforms).map(platform => {
                            return <Platform key={platform.name} name={platform.name} connected={platform.connected} api={platform.api} img={platform.img} size={[]} />
                        })
                    }
                </ul>
                <h3 className="text-center text-lg mt-10">Only spotify connection is avaible for now</h3>
            </div>


        </div>
    );
}

export default UseProtectedRoute(Platforms);

type IPlatform = {
    key: string
    name: string, 
    connected?: boolean, 
    img: string, 
    api: string,
    size?: []
}

const Platform = ({ name, connected, img, size, api }: IPlatform): JSX.Element => {
    const router = useRouter();


    return (
        <li className="rounded-3xl ring-2 ring-gray-700 p-2 flex flex-row justify-between">
            <div className="flex flex-row h-10">
                <img src={`/streamingPlatforms/${img}.png`} alt=""/>
                {/* <Image src='/streamingPlatforms/spotify.png' width={40} height={35} /> */}
                <h3 className="my-auto font-bold text-xl"> &nbsp; {name} </h3>
            </div>
            <button className={`${!connected ? 'bg-[rgba(242,201,76,1)]' : 'bg-gray-300'} hover:ring-4 ring-gray-700 font-bold rounded-full p-2 `}
                    onClick={!connected ? () => router.push(`/api/${api}/signin`) : () => router.push(`/api/${api}/disconnect`)}>
                {!connected ? 'Connect' : 'Disconnect'}
            </button>
        </li>
    );
}

