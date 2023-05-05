import './ErrorMessage.css';
export default function ErrorMessage() {
    return (
        <section className='error-message'>
            <span className='hazard-symbol'>&#9888;</span>
            <span className='error-message__content'>
                As of November 28th, 2022, Heroku no longer offers a free tier which unfortunately breaks
                this app. I will leave the frontend website running on GitHub Pages, but the rest of the
                functionality will no longer work.
            </span>
        </section>
    );
}
