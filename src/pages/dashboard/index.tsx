import { NextPage } from "next";
import { UseProtectedRoute } from "../../components/Routing";

const Dashboard: NextPage = () => {

    return (
        <main className="app">
            <h1>Dashboard component</h1>
        </main>
    );
}

export default UseProtectedRoute(Dashboard);

