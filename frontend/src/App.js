import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

// import routes
import HomeRoute from './routes/HomeRoute';
import GetSecretRoute from './routes/GetSecretRoute';

function App() {
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
