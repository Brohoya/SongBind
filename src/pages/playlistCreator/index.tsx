import { NextPage } from "next";
import { UseProtectedRoute } from "../../components/Routing";


const PlaylistCreator: NextPage = () => {

    return (
        <div className="app">
            <h1>Playlist creator component</h1>
        </div>
    );
}

export default UseProtectedRoute(PlaylistCreator);
