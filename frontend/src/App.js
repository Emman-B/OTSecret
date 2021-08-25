import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

// import routes
import HomeRoute from './routes/HomeRoute';
import GetSecretRoute from './routes/GetSecretRoute';

// define the backend server depending on node environment
export const backendURL = (process.env.NODE_ENV === 'development')?
    `http://localhost:3010`:`https://otsecret.herokuapp.com`;

function App() {
    return (
        <HashRouter>
            {/* Header */}
            <header className='app-header'>
                <h1 className='app-title'>OTSecret</h1>
                <h2 className='app-subtitle'>A way to send temporary secrets!</h2>
            </header>

            {/* Routes */}
            <Switch>
                <Route exact path='/'>
                    <HomeRoute />
                </Route>
                <Route path='/:id' component={GetSecretRoute}>
                </Route>
            </Switch>

            
            {/* Footer */}
            <footer className='app-footer'>
                <span>Created by Emmanuel Butor</span>
            </footer>
        </HashRouter>
    );
}

export default App;
