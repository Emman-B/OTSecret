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
            const newURL = `${window.location.href}${newID}`
            return (
                <>
                    <br></br>
                    <span>Give this URL to the recipient: </span>
                    <a href={newURL}>{newURL}</a>
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
                <sub>If you want to create a secret...</sub>
                <label>Password for secret (3-64 chars)</label>
                <input ref={passwordRef} type='password'></input>
                <label>Secret message (1-100 characters)</label>
                <textarea ref={messageRef} type='text'></textarea>
                <button disabled={loading} type='submit' onClick={(e) => {
                    e.preventDefault(); // prevents a refresh
                    makeSecret();
                }}>{!loading?'Create Secret':'Creating Secret...'}</button>

                {showIDComponent()}
            </form>
        </div>
    );
}