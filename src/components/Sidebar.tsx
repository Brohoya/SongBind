import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";

// Import SVGs
import Logo from "../assets/webapp/sidebar/logo.svg";
import PlaylistCreator from "../assets/webapp/sidebar/creator.svg";
import Transfer from "../assets/webapp/sidebar/transfer.svg";
import Explore from "../assets/webapp/sidebar/explore.svg";
import Playlists from "../assets/webapp/sidebar/playlist.svg";
import Dashboard from "../assets/webapp/sidebar/dashboard.svg";
import getActivePage from "../hooks/useActivePage";


export default function Sidebar() {
    // const activePage = useContext(ActivePageContext);

    return(
        <div className="sidebar">
            <ul className="mx-auto">

                <li>
                    <Link href="/" >
                        <div className="flex flex-row my-5 cursor-pointer">
                            <Image src={Logo} width={"60"} height={"60"} priority />
                            <h1 className="font-bold text-3xl my-auto text-black">
                                SONGBIND
                            </h1>
                        </div>
                    </Link>
                </li>

                <li className="mt-10">
                    {/* Your library : */}
                </li>

                <SidebarItem title={"Dashboard"} pageName={"dashboard"} img={Dashboard} />
                <SidebarItem title={"Library"} pageName={"library"} img={Playlists} />

                <li className="mt-10">
                    Tools :
                </li>

                <SidebarItem title={"Playlist creator"} pageName={"playlistCreator"} img={PlaylistCreator} />
                <SidebarItem title={"Transfer"} pageName={"transfer"} img={Transfer} />
                <SidebarItem title={"Explore"} pageName={"explore"} img={Explore} />

                {/* <SidebarItem title={"Artists"} img={Artists} />
                <SidebarItem title={"Songs"} img={Songs} />
                <SidebarItem title={"Genres"} img={Genres} /> */}

                <li className="mt-10">
                    Platforms :
                </li>

                <AddPlatform />


            </ul>
        </div>
    );
};

const SidebarItem = ({ title, img, pageName }: {title: string, img: string, pageName: string }): JSX.Element => {
    const activePage = getActivePage();

    return (
        <li>
            <Link href={`/${pageName}`}>
                <button onClick={() => {/*setActivePage(title)*/}} className={`${activePage===title ? 'bg-[rgba(242,201,76,1)]' : 'bg-transparent'} sidebarItem`}>
                    <Image className="my-auto fill-gray-200 stroke-gray-200" src={img} width={"25"} height={"25"} priority />
                    &nbsp; {title}
                </button>
            </Link>
        </li>
    );
}

const AddPlatform = () => {
    // const { setActivePage } = useContext(ActivePageContext);

    return (
        <li>
            <Link href={'/platforms'}>
                <button onClick={() => {/*setActivePage("Connect your platforms")*/}} className={'platforms'}>
                    +
                </button>
            </Link>
        </li>
    ); 
}