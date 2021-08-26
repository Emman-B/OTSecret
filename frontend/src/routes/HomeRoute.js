import CreateSecret from "../components/CreateSecret";
import RedirectToID from "../components/RedirectToID";


export default function HomeRoute() {
    return (
        <div className='app-panels-container'>
            <CreateSecret />
            <RedirectToID />
        </div>
    );
}