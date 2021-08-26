import './GetSecret.css';
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
        <div className='get-secret app-outer-panel'>
            <form className='get-secret-form app-panel'>
                <h4>Unlocking a secret message</h4>
                <Link to='/' className='get-secret-back-link'>Go back</Link>
                <br></br>
                <label>Please enter in a password for secret ID: <div className='get-secret-id'>{id}</div></label>

                <br></br>
                <input type='password' ref={passwordRef} placeholder='Password'></input>

                <button disabled={loading} type='submit' onClick={(e) => {
                    e.preventDefault(); // prevents a refresh
                    handlePasswordSubmit()
                }}>{!loading?'Submit':'Loading...'}</button>

                {secretMessage}
            </form>
        </div>
    );
}