import CreateSecret from "../components/CreateSecret";
import HowItWorks from "../components/HowItWorks";
import RedirectToID from "../components/RedirectToID";


export default function HomeRoute() {
    return (
        <>
            <div className='app-panels-container'>
                <CreateSecret />
                <RedirectToID />
            </div>
            <HowItWorks />
        </>
    );
}