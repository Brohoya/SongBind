import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { UseProtectedRoute } from "../../components/Routing";
import usePlatforms, {useConnectedPlatforms} from "../../hooks/usePlatforms";
// import Cookies from 'cookies';


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const platforms = useConnectedPlatforms(ctx.req, ctx.res);
    // const {setPlatforms} = usePlatforms();
    // setPlatforms(platforms);

    return { props: platforms }
}

type Platform = {
    name: string,
    connected: boolean,
    api: string,
    img: string,
}

type Platforms = {
    [key: string] : Platform
}

// :InferGetServerSidePropsType<typeof getServerSideProps>
const Platforms: NextPage = (platforms: Platforms) => {
    const router = useRouter();
    console.log(platforms);
    // const platforms = useConnectedPlatforms();
    // const {getPlatforms} = usePlatforms()
    // const data = getPlatforms();
    // console.log(data);
    
    return (
        <div className="app">
            <div className="mx-auto">
                <h1 className="text-center font-bold text-3xl">Connect your platforms : </h1>
                <ul className="flex flex-col space-y-5 mt-10 w-6/12 mx-auto">
                    {
                        Object.values(platforms).slice(1).map(platform => {
                            return <Platform key={platform.name} name={platform.name} connected={platform.connected} api={platform.api} img={platform.img} size={[]} />
                        })
                    }
                </ul>
                <h3 className="text-center text-lg mt-10">Only spotify connection is avaible for now</h3>
            </div>


        </div>
    );
}

{/* <li className="rounded-full ring-2 ring-gray-700 p-2 flex flex-row justify-between">
        <div className="flex flex-row h-10">
            <img src="/streamingPlatforms/spotify.png" alt=""/>
            <h3 className="my-auto font-bold text-xl"> &nbsp; Spotify </h3>
        </div>
        <button className="rounded-full p-2 bg-[rgba(242,201,76,1)] hover:ring-4 ring-gray-700 font-bold"
                onClick={ async () => {
                    router.push('/api/spotify/signin');
                }}>
            Connect
        </button>
    </li>

    <button className="rounded-lg ring-2 ring-black py-2 "
            onClick={ () => {
                router.push('/api/spotify/topTracks');
            }}>
        Login to your Youtube account
    </button>
    */}

export default UseProtectedRoute(Platforms);

type IPlatform = {
    key: string
    name: string, 
    connected?: boolean, 
    img: string, 
    api: string,
    size?: []
    // providers: BuiltInProviderType
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