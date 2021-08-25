import CreateSecret from "../components/CreateSecret";
import RedirectToID from "../components/RedirectToID";


export default function HomeRoute() {
    return (
        <div>
            <CreateSecret />
            <RedirectToID />
        </div>
    );
}