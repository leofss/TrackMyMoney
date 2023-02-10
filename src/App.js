import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/UseAuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Profile from './pages/profile/Profile';

function App() {
  const {authIsReady, user} = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar/>
            <Switch>
              <Route exact path="/">
                {!user && <Redirect to="/login" />}
                {user && <Home/>}
              </Route>
            </Switch>
    
            <Switch>
            <Route exact path="/login">
                {!user && <Login />}
                {user &&<Redirect to="/" />}
              </Route>
            </Switch>
    
            <Switch>
              <Route exact path="/signup">
                {!user && <Signup />}
                {user &&<Redirect to="/" />}
              </Route>
            </Switch>
            <Switch>
              <Route exact path="/profile">
                {!user && <Redirect to="/login" />}
                {user && <Profile />}
              </Route>
            </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
