import './HowItWorks.css';
export default function HowItWorks() {
    return (
        <section className='how-it-works'>
            <h4>How does it work?</h4>
            <p>
                When you provide a secret message and password, a randomly
                generated ID is provided to you in the form of a URL. At the
                same time, a backend server keeps track of that ID along with
                the information you provided. The password and secret message
                are both encrypted when stored for security purposes.
            </p>
        </section>
    );
}
