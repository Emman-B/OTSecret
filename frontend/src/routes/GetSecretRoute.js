
import GetSecret from "../components/GetSecret";

export default function GetSecretRoute(props) {
    // pass in the id from the path parameter
    const id = props.match.params.id;

    return (
        <GetSecret id={id} />
    );
}