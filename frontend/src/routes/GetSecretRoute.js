import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { backendURL } from "../App";

export default function GetSecretRoute(props) {
    const [secretMessage, setSecretMessage] = useState(<div></div>);

    const id = props.match.params.id;

    const passwordRef = useRef();

    const handlePasswordSubmit = () => {
        axios.post(`${backendURL}/v1/secret/${id}`, {password: passwordRef.current.value})
            .then((response) => {
                setSecretMessage(<div>Secret message: {response.data.message}</div>)
            })
            .catch(() => {
                setSecretMessage(<div>Failed</div>);
            });
    };

    return (
        <form>
            <Link to='/'>Go back</Link>
            <br></br>
            <label>Please enter in a password for secret ID: {id}</label>

            <br></br>
            <input type='password' ref={passwordRef}></input>

            <button type='submit' onClick={() => {handlePasswordSubmit()}}>Submit</button>

            {secretMessage}
        </form>
    );
}