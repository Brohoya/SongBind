import { NextPage } from "next";
import { UseProtectedRoute } from "../../components/Routing";


const Transfer: NextPage = () => {

    return (
        <div className="app">
            <h1> Transfer component </h1>
        </div>
    );
};

export default UseProtectedRoute(Transfer);
