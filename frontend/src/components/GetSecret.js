import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { backendURL } from "../App";

export default function GetSecret(props) {
    const [secretMessage, setSecretMessage] = useState(<div></div>);
    const [loading, setLoading] = useState(false);

    const id = props.id;

    const passwordRef = useRef();

    const handlePasswordSubmit = () => {
        setLoading(true);
        axios.post(`${backendURL}/v1/secret/${id}`, {password: passwordRef.current.value})
            .then((response) => {
                setSecretMessage(<div>Secret message: {response.data.message}</div>)
            })
            .catch(() => {
                setSecretMessage(<div>Failed</div>);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <form>
            <Link to='/'>Go back</Link>
            <br></br>
            <label>Please enter in a password for secret ID: {id}</label>

            <br></br>
            <input type='password' ref={passwordRef}></input>

            <button disabled={loading} type='submit' onClick={(e) => {
                e.preventDefault(); // prevents a refresh
                handlePasswordSubmit()
            }}>{!loading?'Submit':'Loading...'}</button>

            {secretMessage}
        </form>
    );
}