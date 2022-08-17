import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { UseProtectedRoute } from "../../components/Routing";
        
        
// :InferGetServerSidePropsType<typeof getServerSideProps>
const Platforms: NextPage = () => {
    const router = useRouter();
    
    return (
        <div className="app">
            <div className="mx-auto">
                <h1>Connect your platforms : </h1>
                <ul className="flex flex-col space-y-5 mt-5 w-6/12 mx-auto">
                    <button className="rounded-lg ring-2 ring-black py-2 "
                            onClick={ async () => {
                                router.push('/api/spotify/signin');
                            }}>
                        Login to your Spotify account
                    </button>

                    <button className="rounded-lg ring-2 ring-black py-2 "
                            onClick={ () => {
                                router.push('/api/spotify/topTracks');
                            }}>
                        Login to your Youtube account
                    </button>

                </ul>
            </div>


        </div>
    );
}

export default UseProtectedRoute(Platforms);

type IPlatform = {
    name: string, 
    connected?: boolean, 
    img: string, 
    credentials?: {}
    // providers: BuiltInProviderType
}


const Platform = ({ name, connected, img, credentials }, { providers }): JSX.Element => {



    return (
        <li className="flex flex-row justify-between space-x-2 mt-5 border-solid border-2 border-black cursor-pointer">
            <div className="flex flex-row">
                <Image src={img} width={'35'} height={'35'} />
                <h1> {name} </h1>
            </div>

        </li>
    );
}