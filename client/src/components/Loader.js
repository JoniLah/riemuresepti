import BarLoader from "react-spinners/BarLoader";

const Loader = () => {
    return (
        <div className="flex w-100 justify-content-center">
            <div className="centered">
                <BarLoader color="#36af18" />
            </div>
        </div>
    );
}

export default Loader;