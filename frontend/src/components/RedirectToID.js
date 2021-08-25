import './RedirectToID.css';

export default function RedirectToID() {
    return (
        <div className='redirect-to-id app-outer-panel'>
            <form className='redirect-id-form app-panel'>
                <sub>If you have an ID/URL of the secret...</sub>
                <label>Enter URL or ID of secret</label>
                <input type='text'></input>
                <button onClick={(e) => {
                    e.preventDefault();
                }}>Go to ID</button>
            </form>
        </div>
    );
}