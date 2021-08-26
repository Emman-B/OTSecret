import './RedirectToID.css';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';

export default function RedirectToID() {
    const idRef = useRef();
    const history = useHistory();

    const idHelperTooltipContent = 'If you were given a URL, the ID of the secret' +
            ' is the last part of the URL containing letters and numbers. For example,' +
            ' a URL ending with "/abc123" would have the ID of abc123.'

    return (
        <div className='redirect-to-id app-outer-panel'>
            <form className='redirect-id-form app-panel'>
                <h4>If you have an ID of the secret...</h4>
                <label title={idHelperTooltipContent}>Enter ID of secret</label>
                <input type='text' title='Only letters and numbers' ref={idRef} placeholder='ID'></input>
                <button onClick={(e) => {
                    e.preventDefault();
                    // input validation, only allow alphanumeric
                    if (idRef.current.value.match(/^[a-zA-Z0-9]+$/i)) {
                        history.push(`/${idRef.current.value}`);
                    } else {
                        window.alert('This is not an ID. The ID of a secret only contains letters and numbers.');
                    }

                }}>Go to ID</button>
            </form>
        </div>
    );
}