import { NextPage } from "next";
import { UseProtectedRoute } from "../../components/Routing";

const Dashboard: NextPage = () => {

    return (
        <div className="app">
            <h1>Dashboard component</h1>
        </div>
    );
}

export default UseProtectedRoute(Dashboard);

