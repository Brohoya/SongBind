import { NextPage } from "next";
import { UseProtectedRoute } from "../../components/Routing";

const Explore: NextPage = () => {

    return (
        <div className="app">
            <h1> Explore component </h1>
        </div>
    );
}

export default UseProtectedRoute(Explore);
