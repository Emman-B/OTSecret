import './RedirectToID.css';

export default function RedirectToID() {
    return (
        <div className='redirect-to-id app-outer-panel'>
            <form className='redirect-id-form app-panel'>
                <h4>If you have an ID/URL of the secret...</h4>
                <label>Enter URL or ID of secret</label>
                <input type='text'></input>
                <button onClick={(e) => {
                    e.preventDefault();
                }}>Go to ID</button>
            </form>
        </div>
    );
}