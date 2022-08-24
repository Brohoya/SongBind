import Link from "next/link";
import Image from "next/image";
import { Bars } from "react-loader-spinner";
import React from "react";

// Import SVGs
import Logo from "../assets/webapp/sidebar/logo.svg";
import PlaylistCreator from "../assets/webapp/sidebar/creator.svg";
import Transfer from "../assets/webapp/sidebar/transfer.svg";
import Explore from "../assets/webapp/sidebar/explore.svg";
import Library from "../assets/webapp/sidebar/library.svg";
import Dashboard from "../assets/webapp/sidebar/dashboard.svg";
import dashboard from "../assets/webapp/sidebar/dashboard.svg";
import getActivePage from "../hooks/useActivePage";
import usePlatforms, { IPlatforms } from "../hooks/usePlatforms";


export default function Sidebar(): JSX.Element {
    const {platforms, isLoading}: IPlatforms = usePlatforms();

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
                <SidebarItem title={"Library"} pageName={"library"} img={Library} />

                <li className="mt-10">
                    Tools :
                </li>

                <SidebarItem title={"Playlist creator"} pageName={"playlistCreator"} img={PlaylistCreator} />
                <SidebarItem title={"Transfer"} pageName={"transfer"} img={Transfer} />
                <SidebarItem title={"Explore"} pageName={"explore"} img={Explore} />

                <li className="mt-10">
                    Platforms :
                </li>


                {
                    isLoading ?
                        <div className="flex mx-auto justify-center">
                            <Bars
                                height="35"
                                color="#333333"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                        :
                        Object.values(platforms).map(platform => {
                            if(platform.connected) return <Platform key={platform.name} name={platform.name} img={platform.img} />
                        })
                }

                <AddPlatform />


            </ul>
        </div>
    );
};

const SidebarItem = ({ title, img, pageName }: {title: string, img: string, pageName: string }): JSX.Element => {
    const activePage = getActivePage();
    // console.log(dashboard);

    return (
        <li>
            <Link href={`/${pageName}`}>
                <button className={`${activePage===title ? 'bg-[rgba(242,201,76,1)]' : 'bg-transparent'} sidebarItem`}>
                    <Image className="my-auto fill-pink-500" src={img} width={"25"} height={"25"} priority />
                    &nbsp; {title}
                </button>
            </Link>
        </li>
    );
}

const Platform = ({name, img}) => {

    return (
        <li>
            <Link href={'/platforms'}>
                <button onClick={() => {}} className={'sidebarItem bg-transparent'}>
                    <Image src={`/streamingPlatforms/${img}.png`} width={"25"} height={"25"} priority />
                    {/* <img src={`/streamingPlatforms/${img}.png`} alt=""/> */}
                    &nbsp; {name}
                </button>
            </Link>
        </li>
    )
}

const AddPlatform = () => {

    return (
        <li>
            <Link href={'/platforms'}>
                <button onClick={() => {}} className={'platforms'}>
                    +
                </button>
            </Link>
        </li>
    ); 
}