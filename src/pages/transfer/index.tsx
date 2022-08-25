import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { UseProtectedRoute } from "../../components/Routing";
import usePlatforms, { IPlatforms } from "../../hooks/usePlatforms";
import { getFollowedArtistsSpotify, getSavedSongsSpotify, getUserPlaylistsSpotify } from "../../lib/Spotify";
import useAuth from "../../hooks/useAuth";
import { importArtistsSpotify, importPlaylistsSpotify, importSongsSpotify } from "../../lib/Firebase";

import Image from "next/image";
import Import from '../../assets/webapp/transfer/import.svg';
import Export from '../../assets/webapp/transfer/export.svg';
import Load from '../../assets/webapp/transfer/load.svg';
import Playlists from "../../assets/webapp/transfer/playlist.svg";
import Songs from "../../assets/webapp/transfer/song.svg";
import Artists from "../../assets/webapp/transfer/artist.svg";



const TransferPage: NextPage = () => {
    const { platforms, isLoading }: IPlatforms = usePlatforms();
    const availablePlatforms = [];
    Object.values(platforms).map(platform => platform.connected ? availablePlatforms.push(platform) : null);

    return (
        <div className="app">

            <Loader show={isLoading} />

            {!isLoading && availablePlatforms.length != 0 && (
                <Transfer platforms={availablePlatforms} />
            )}

            {availablePlatforms.length == 0 && (
                <h1> Connect your platforms to start transfering </h1>
            )}

        </div>
    );
};

export default UseProtectedRoute(TransferPage);


const Transfer = ({ platforms }) => {
    const [toggleChecked, setToggleChecked] = useState(false);
    const [selectedPlatform, setSelectedPlatform] = useState(platforms[0] ?? null);
    const [selectedContent, setSelectedContent] = useState('playlists');
    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState({
        direction: 'export',
        platform: selectedPlatform,
        content: selectedContent
    });
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // console.log(data);

    useEffect(() => {
        setLoaded(false);
        setQuery({
            direction: toggleChecked ? 'import' : 'export',
            platform: selectedPlatform,
            content: selectedContent
        });
    }, [toggleChecked, selectedPlatform, selectedContent]);

    const checkAll = () => {
        let inputs = document.getElementsByName('data');
        let ids = Array.from(inputs) as HTMLInputElement[];
        ids.map(id => id.type === 'checkbox' ? id.checked = true : null);
    }

    const unCheckAll = () => {
        let inputs = document.getElementsByName('data');
        let ids = Array.from(inputs) as HTMLInputElement[];
        ids.map(id => id.type === 'checkbox' ? id.checked = false : null);
    }

    return (
        <div className="flex flex-col p-5 ring-2 ring-gray-700 rounded-3xl h-full">
            <div className="flex flex-row justify-around pb-5 border-b-2 border-gray-800">

                <Toggle checked={toggleChecked} setChecked={setToggleChecked} />

                <ContentSelector setSelectedContent={setSelectedContent} />

                <h3 className="text-lg font-bold my-auto">{toggleChecked ? ' from ' : ' to '}</h3>

                <PlatformSelector platforms={platforms} selectedPlatform={selectedPlatform} setSelectedPlatform={setSelectedPlatform} toggleChecked={toggleChecked} />

                {!loaded ? 
                    <LoadButton setLoaded={setLoaded} query={query} setData={setData} setIsLoading={setIsLoading} isLoading={isLoading} />
                    :
                    toggleChecked ? <ImportButton query={query} data={data} /> : <ExportButton query={query} data={data} />
                }

            </div>
            <div className="mt-5 overflow-auto">

                <Loader show={isLoading} />

                <div className="flex flex-col">


                    {loaded && data != undefined ? 
                        (() => {switch(query.content) {
                            case 'playlists':
                                return (
                                    <>
                                        <div className="flex flex-row space-x-5 px-5 py-2 mr-5 ml-2 mb-5 justify-start">
                                            <input onChange={ (e) => {
                                                    if(e.target.checked) checkAll();
                                                    else unCheckAll();
                                                }
                                            } className="my-auto" type="checkbox" name="playlists" id="playlists" />
                                            <div className="grid grid-cols-4 gap-5 w-full">
                                                <h1 className="font-bold my-auto col-span-2 text-center">Title</h1>
                                                <h1 className="font-bold my-auto text-center">Creator</h1>
                                                <h1 className="font-bold my-auto text-center">Tracks</h1>
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-3">
                                            {data.map(playlist => 
                                                <Playlist 
                                                    key={playlist.id} id={playlist.id} 
                                                    img={playlist.images[0].url} 
                                                    name={playlist.name}
                                                    tracks={playlist.tracks.total}
                                                    owner={playlist.owner.display_name} 
                                                />
                                            )}
                                        </div>
                                    </>
                                );
                            case 'songs':
                                return (
                                    <>
                                        <div className="flex flex-row space-x-5 px-5 py-2 mr-5 ml-2 mb-5 justify-start">
                                            <input onChange={ (e) => {
                                                        if(e.target.checked) checkAll();
                                                        else unCheckAll();
                                                    }
                                                } className="my-auto" type="checkbox" name="playlists" id="playlists" />
                                            <div className="grid grid-cols-4 gap-5 w-full">
                                                <h1 className="font-bold my-auto col-span-2 text-center">Title</h1>
                                                <h1 className="font-bold my-auto text-center">Artist/Group</h1>
                                                <h1 className="font-bold my-auto text-center">Duration</h1>
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-3">
                                            {data.map(({track}) => 
                                                <Track 
                                                    key={track.id} id={track.id} 
                                                    img={track.album.images[0].url} 
                                                    name={track.name}
                                                    artist={track.artists[0].name}
                                                    duration={track.duration_ms} 
                                                />
                                            )}
                                        </div>
                                    </>
                                );
                            case 'artists':
                                return (
                                    <>
                                        <div className="flex flex-row px-5 py-2 mr-5 ml-2 mb-5 justify-start">
                                            <input onChange={ (e) => {
                                                        if(e.target.checked) checkAll();
                                                        else unCheckAll();
                                                    }
                                                } className="my-auto" type="checkbox" name="artists" id="artists" />
                                            <div className="grid grid-cols-2 gap-3 w-full">
                                                <h1 className="font-bold my-auto text-center">Name</h1>
                                                <h1 className="font-bold my-auto text-center">Name</h1>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {data.map((artist) => 
                                                <Artist 
                                                    key={artist.id} id={artist.id} 
                                                    img={artist.images[0].url} 
                                                    name={artist.name}
                                                />
                                            )}
                                        </div>
                                    </>
                                );
                        }})()
                        :
                        null
                    }
                </div>

            </div>

        </div>
    )
}

const Playlist = ({ img, name, owner, id, tracks }) => {
    return (
        <div className="flex flex-row space-x-5 px-5 py-2 mr-5 ml-2 ring-2 ring-inset ring-[rgba(79,79,79,1)] rounded-2xl">
            <input className="my-auto" type="checkbox" name="data" value={id}/>
            <div className="grid grid-cols-4 gap-5 w-full ">
                <div className="col-span-2 flex flex-row space-x-3">
                    <img className="w-8 h-8" src={img} alt="" />
                    <h3 className="my-auto"> {name} </h3>
                </div>
                <h3 className="my-auto text-center"> {owner} </h3>
                <h3 className="my-auto text-center"> {tracks} </h3>
            </div>
        </div>
    )
}

const Track = ({ img, name, artist, duration, id }) => {
    const min = (duration/1000/60).toFixed(0);
    let sec = (duration/1000%60).toFixed(0);
    sec = sec.length === 1 ? '0' + sec : sec;

    return (
        <div className="flex flex-row space-x-5 px-5 py-2 mr-5 ml-2 ring-2 ring-inset ring-[rgba(79,79,79,1)] rounded-2xl">
            <input className="my-auto" type="checkbox" name="data" value={id}/>
            <div className="grid grid-cols-4 gap-5 w-full ">
                <div className="col-span-2 flex flex-row space-x-3">
                    <img className="w-8 h-8" src={img} alt="" />
                    <h3 className="my-auto"> {name} </h3>
                </div>
                <h3 className="my-auto text-center"> {artist} </h3>
                <h3 className="my-auto text-center"> {`${min}:${sec}`} </h3>
            </div>
        </div>
    )
}

const Artist = ({ img, name, id }) => {
    return (
        <div className="flex flex-row space-x-5 px-5 py-2 mr-5 ml-2 ring-2 ring-[rgba(79,79,79,1)] rounded-2xl">
            <input className="my-auto" type="checkbox" name="data" value={id}/>
            <img className="w-8 h-8" src={img} alt="" />
            <h3 className="my-auto"> {name} </h3>
        </div>
    )
}

const ImportButton = ({ query, data }) => {

    const { user } = useAuth();

    const importDB = async () => {

        let allInputs = Array.from(document.getElementsByName('data')) as HTMLInputElement[];
        let allCheckboxes = allInputs.filter(input => input.type === 'checkbox');
        // console.log('CHECKBOXES', allCheckboxes);
        // console.log('DATA', data);

        let importData = []
        for (let i = 0; i < allCheckboxes.length; i++) {
            if(allCheckboxes[i].checked) {
                importData.push(data[i])
            }
        };

        console.log('IMPORTED DATA', importData);

        let progress;
        switch (query.content) {
            case 'playlists':
                switch(query.platform.api) {
                    case 'youtube': break;
                    case 'spotify': importPlaylistsSpotify(importData, user); break;
                } break;
            case 'songs':
                switch(query.platform.api) {
                    case 'youtube': break;
                    case 'spotify': importSongsSpotify(importData, user); break;
                } break;
            case 'artists':
                switch(query.platform.api) {
                    case 'youtube': break;
                    case 'spotify': importArtistsSpotify(importData, user); break;
                } break;
        };

    }

    return (
        <button onClick={importDB} className="ring-4 ring-gray-800 rounded-2xl px-4 bg-[rgba(242,201,76,1)]">
            <div className="flex flex-row">
                <Image src={Import} width='20' height='20' priority />
                <h3 className="text-lg font-bold"> &nbsp; Import</h3>
            </div>
        </button>
    )
}

const ExportButton = ({ query, data }) => {

    return (
        <button onClick={() => {}} className="ring-4 ring-gray-800 rounded-2xl px-4 bg-[rgba(242,201,76,1)]">
            <div className="flex flex-row">
                <Image src={Export} width='20' height='20' priority />
                <h3 className="text-lg font-bold"> &nbsp; Export</h3>
            </div>
        </button>
    )
}

const LoadButton = ({ setLoaded, setData, setIsLoading, query, isLoading }) => {

    const load = async () => {
        setIsLoading(true);
        let data;
        if(query.direction === 'import') {
            switch (query.content) {
                case 'playlists':
                    switch(query.platform.api) {
                        case 'youtube': break;
                        case 'spotify': data = await getUserPlaylistsSpotify(); break;
                    } break;
                case 'songs':
                    switch(query.platform.api) {
                        case 'youtube': break;
                        case 'spotify': data = await getSavedSongsSpotify(); break;
                    } break;
                case 'artists':
                    switch(query.platform.api) {
                        case 'youtube': break;
                        case 'spotify': data = await getFollowedArtistsSpotify(); break;
                    } break;
            }
        } else {

        }
        
        setData(data);
        setLoaded(true);
        setIsLoading(false);
    };

    return (
        <button onClick={load} className="ring-4 ring-gray-800 rounded-2xl px-4 bg-gray-300">
            <div className="flex flex-row">
                <div className={`${isLoading ? 'animate-spin' : null} flex my-auto`}>
                    <Image className={`scale-x-[-1]`} src={Load} width='20' height='20' priority />
                </div>
                <h3 className="text-lg font-bold"> &nbsp; Load</h3>
            </div>
        </button>
    )
}

const ContentSelector = ({ setSelectedContent }) => {
    const [contentImg, setContentImg] = useState(Playlists)

    const handleChange = (e) => {
        setSelectedContent(e.target.value);
        switch (e.target.value) {
            case 'playlists': setContentImg(Playlists); break;
            case 'songs': setContentImg(Songs); break;
            case 'artists': setContentImg(Artists); break;
        }
    };

    return (
        <div className="p-3 rounded-xl ring-2 ring-gray-800 flex flex-row font-bold">
            <Image className="my-auto" src={contentImg} width={"20"} height={"20"} priority />
            <select className="cursor-pointer" onChange={handleChange} name="content" id="content">
                <option value={'playlists'}> &nbsp; Playlists </option>
                <option value={'songs'}> &nbsp; Liked songs </option>
                <option value={'artists'}> &nbsp; Artists </option>
            </select>
        </div>
    )
}

const PlatformSelector = ({ platforms, selectedPlatform, setSelectedPlatform, toggleChecked }) => {

    const handleChange = (e) => {
        setSelectedPlatform(JSON.parse(e.target.value));
    };

    return (
        <div className="p-3 rounded-xl ring-2 ring-gray-800 flex flex-row font-bold">
            <Image className="my-auto" src={`/streamingPlatforms/${selectedPlatform.img}.png`} width={"25"} height={"25"} priority />
            <select className="cursor-pointer" name="platform" id="platform" onChange={handleChange}>
                {platforms.map(platform => platform.connected ?
                    <option key={platform.name} value={JSON.stringify(platform)}>
                        {platform.name}
                    </option>
                    :
                    null
                )}
                <option value={JSON.stringify({name: 'file', img: 'json'})}> File </option>
            </select>
        </div>
    )
}

const Toggle = ({ checked, setChecked }) => {
    
    const handleChange = () => setChecked(!checked);

    return (
        <label className={`switch ${checked ? 'bg-[rgba(242,201,76,1)]' : 'bg-gray-300'}`}>
            <input onChange={handleChange} id="checkBox" type="checkbox" className="sr-only peer"></input>
            <span className="slider"></span>
            <label className={`${checked ? 'left-1' : 'left-10'}`} htmlFor="checkBox">{checked ? 'Import' : 'Export'}</label>
        </label>
    )
}



const Loader = ({ show }) => {
    return show ? (
        <div className="flex mx-auto justify-center mt-20">
            <Bars
                height="80"
                width="80"
                color="#333333"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    ) : null;
}



// Future features ? 

/* <div className="flex flex-col">
    <div>
        <input type="checkbox" id="import" name="imported"></input>
        <label htmlFor="import"> &nbsp; Mask imported</label>
    </div>
    <div>
        <input type="checkbox" id="selCreated" name="selCreated"></input>
        <label htmlFor="selCreated"> &nbsp; Self created only</label>
    </div>
</div> */
