import { useRef, useState } from "react";
import axios from 'axios';
import { backendURL } from "../App";


export default function CreateSecret() {
    const [newID, setNewID] = useState();

    const passwordRef = useRef();
    const messageRef = useRef();

    const makeSecret = () => {
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
        <form>
            <label>Password for secret (3-64 chars)</label>
            <br></br>
            <input ref={passwordRef} type='password'></input>
            <br></br>
            <label>Secret message (1-100 characters)</label>
            <br></br>
            <textarea ref={messageRef} type='text'></textarea>
            <br></br>
            <button type='submit' onClick={() => {makeSecret()}}>Create secret</button>

            {showIDComponent()}
        </form>
    );
}