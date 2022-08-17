import { NextPage } from "next";
import { UseProtectedRoute } from "../../components/Routing";



const Library: NextPage = () => {

    return (
        <div className="app">
            <h1>Library component</h1>
        </div>
    );
}

export default UseProtectedRoute(Library);