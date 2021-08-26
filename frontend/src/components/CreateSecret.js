import './CreateSecret.css';
import { useRef, useState } from "react";
import axios from 'axios';
import { backendURL } from "../App";


export default function CreateSecret() {
    const [newID, setNewID] = useState();
    const [loading, setLoading] = useState(false);

    const passwordRef = useRef();
    const messageRef = useRef();

    const makeSecret = () => {
        setLoading(true);
        axios.post(`${backendURL}/v1/secret`, {password: passwordRef.current.value, message: messageRef.current.value})
            .then((response) => {
                // success
                setNewID(response.data.id);
                passwordRef.current.value = '';
                messageRef.current.value = '';
            })
            .catch((err) => {
                // failure
                setNewID(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const showIDComponent = () => {
        if (newID) {
            const newURL = `${window.location.href}${newID}`;

            // function for copying the url to clipboard
            const copyToClipboard = () => {
                navigator.clipboard.writeText(newURL);
            };

            return (
                <>
                    <span>Give this URL to the recipient: </span>
                    <a href={newURL}>{newURL}</a>
                    <button type='button' onClick={() => copyToClipboard()}>Copy to Clipboard</button>
                    <span className='create-instructions'>
                        This secret will expire in 15 minutes, or when the recipient
                        reveals the secret.
                    </span>
                </>
            );
        } else if (newID === null) {
            // error case
            return <span>failure</span>
        } else {
            return <span></span>
        }
    }

    return (
        <div className='create-secret app-outer-panel'>
            <form className='create-form app-panel'>
                <h4>If you want to create a secret...</h4>
                <label>Secret message (1-100 characters)</label>
                <textarea maxLength={100} ref={messageRef} type='text' placeholder='What secret do you want to share?'></textarea>
                <label>Password for secret (3-64 chars)</label>
                <input ref={passwordRef} type='password' placeholder='Password'></input>
                <button disabled={loading} type='submit' onClick={(e) => {
                    e.preventDefault(); // prevents a refresh
                    makeSecret();
                }}>{!loading?'Create Secret':'Creating Secret...'}</button>

                {showIDComponent()}
            </form>
        </div>
    );
}