import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { UseProtectedRoute } from "../../components/Routing";
import usePlatforms, { IPlatforms } from "../../hooks/usePlatforms";
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

    useEffect(() => {
        setLoaded(false);
    }, [toggleChecked, selectedPlatform, selectedContent])

    useEffect(() => {
        setQuery({
            direction: toggleChecked ? 'import' : 'export',
            platform: selectedPlatform,
            content: selectedContent
        });
    }, [loaded])

    return (
        <div className="flex flex-col p-5 ring-2 ring-gray-700 rounded-3xl h-full">
            <div className="flex flex-row justify-around pb-5 border-b-2 border-gray-800">

                <Toggle checked={toggleChecked} setChecked={setToggleChecked} />

                <ContentSelector setSelectedContent={setSelectedContent} />

                <h3 className="text-lg font-bold my-auto">{toggleChecked ? ' from ' : ' to '}</h3>

                <PlatformSelector platforms={platforms} selectedPlatform={selectedPlatform} setSelectedPlatform={setSelectedPlatform}  />

                {!loaded ? 
                    <LoadButton setLoaded={setLoaded} query={query} setData={setData} setIsLoading={setIsLoading} />
                    :
                    toggleChecked ? <ImportButton query={query} setData={setData} /> : <ExportButton query={query} setData={setData} />
                }

            </div>
            <div className="mt-5 overflow-auto">
                <Loader show={isLoading} />
                {/* <h1> {platforms.length} platforms connected: music transfer component rendered </h1> */}
                <div className="flex flex-col">

                    {loaded && data != undefined ? 
                        data.map(content => {
                            return <h3 key={content.id}> {content.name}</h3>
                        })
                        :
                        null
                    }
                </div>

            </div>

        </div>
    )
}

const ImportButton = ({ query, setData }) => {

    // const sendQuery = () => {
        
    // }

    return (
        <button onClick={() => {}} className="ring-4 ring-gray-800 rounded-2xl px-4 bg-[rgba(242,201,76,1)]">
            <div className="flex flex-row">
                <Image src={Import} width='20' height='20' priority />
                <h3 className="text-lg font-bold"> &nbsp; Import</h3>
            </div>
        </button>
    )
}

const ExportButton = ({ query, setData }) => {

    return (
        <button onClick={() => {}} className="ring-4 ring-gray-800 rounded-2xl px-4 bg-[rgba(242,201,76,1)]">
            <div className="flex flex-row">
                <Image src={Export} width='20' height='20' priority />
                <h3 className="text-lg font-bold"> &nbsp; Export</h3>
            </div>
        </button>
    )
}

const LoadButton = ({ setLoaded, setData, setIsLoading, query }) => {

    const load = async () => {
        setIsLoading(true);
        let dataQuery;
        if(query.direction === 'import') {
            switch (query.content) {
                case 'playlists':
                    switch(query.platform.api) {
                        case 'youtube': break;
                        case 'spotify':
                            dataQuery = await fetch('/api/spotify/get/playlists', { method: 'GET' });
                            break;
                    }
                    break;
                case 'songs':
                    switch(query.platform.api) {
                        case 'youtube': break;
                        case 'spotify': break;
                    }
                    break;
                case 'artists':
                    switch(query.platform.api) {
                        case 'youtube': break;
                        case 'spotify': break;
                    }
                    break;
            }
        } else {

        }
        let data;
        if(dataQuery !== undefined) data = await dataQuery.json();
        setData(data);
        setLoaded(true);
        setIsLoading(false);
    };

    return (
        <button onClick={load} className="ring-4 ring-gray-800 rounded-2xl px-4 bg-gray-300">
            <div className="flex flex-row">
                <Image src={Load} width='20' height='20' priority />
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
            <select onChange={handleChange} name="content" id="content">
                <option value={'playlists'}> &nbsp; Playlists </option>
                <option value={'songs'}> &nbsp; Liked songs </option>
                <option value={'artists'}> &nbsp; Artists </option>
            </select>
        </div>
    )
}

const PlatformSelector = ({ platforms, selectedPlatform, setSelectedPlatform }) => {

    const handleChange = (e) => {
        setSelectedPlatform(JSON.parse(e.target.value));
    };

    return (
        <div className="p-3 rounded-xl ring-2 ring-gray-800 flex flex-row font-bold">
            <Image className="my-auto" src={`/streamingPlatforms/${selectedPlatform.img}.png`} width={"25"} height={"25"} priority />
            <select name="platform" id="platform" onChange={handleChange}>
                {platforms.map(platform => platform.connected ?
                    <option key={platform.name} value={JSON.stringify(platform)}>
                        {platform.name}
                    </option>
                    :
                    null
                )}
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
