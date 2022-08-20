import { NextPage } from "next";
import { Bars } from "react-loader-spinner";
import { UseProtectedRoute } from "../../components/Routing";
import usePlatforms, { IPlatforms } from "../../hooks/usePlatforms";


const TransferPage: NextPage = () => {
    const { platforms, isLoading }: IPlatforms = usePlatforms();
    const availablePlatforms = [];
    Object.values(platforms).map(platform => platform.connected ? availablePlatforms.push(platform) : null);
    console.log(availablePlatforms);

    return (
        <div className="app">

            <Loader show={isLoading} />

            {!isLoading && availablePlatforms.length != 0 && (
                <Transfer platforms={availablePlatforms} />
            )}

            {availablePlatforms.length == 0 && (
                <h1> Connect platforms first </h1>
            )}

        </div>
    );
};

export default UseProtectedRoute(TransferPage);



const Transfer = ({ platforms }) => {

    return <h1> {platforms.length} platforms connected. Music transfer component </h1>
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
