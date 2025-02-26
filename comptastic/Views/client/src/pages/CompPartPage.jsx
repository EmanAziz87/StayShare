import {useParams} from "react-router-dom";

const CompPartPage = () => {
    const { component } = useParams();
    return (
        <h1>{`Choose your ${component}`}</h1>
    );
}

export default CompPartPage;