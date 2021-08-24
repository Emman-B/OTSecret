import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

// import routes
import HomeRoute from './routes/HomeRoute';
import GetSecretRoute from './routes/GetSecretRoute';

// define the backend server depending on node environment
export const backendURL = (process.env.NODE_ENV === 'development')?
    `http://localhost:3010`:`https://otsecret.herokuapp.com`;

function App() {
    console.log(process.env.NODE_ENV);
    return (
        <HashRouter>
            <Switch>
                <Route exact path='/'>
                    <HomeRoute />
                </Route>
                <Route path='/:id' component={GetSecretRoute}>
                </Route>
            </Switch>
        </HashRouter>
    );
}

export default App;
