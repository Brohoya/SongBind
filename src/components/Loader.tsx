import { Bars } from "react-loader-spinner";

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

export default Loader;