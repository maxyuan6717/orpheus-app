import styles from "./App.module.css";
import Dashboard from "./pages/dashboard";
import DayPage from "./pages/day";
import Register from "./pages/register";
import Login from "./pages/login";
import NavMenu from "./components/menu";

import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";
import { checkUser } from "./util/api";
import axios from "axios";
import store from "./store";
import "./common/typography.css";
import Loading from "./components/loading";

function App() {
  const [authed, setAuthed] = useState(-1);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const onMount = async () => {
      const auth = await checkUser();
      if (!auth || !auth.data.auth) {
        setAuthed(0);
      } else {
        setAuthed(1);
      }
    };
    onMount();
  }, []);

  const PublicRoute = ({ children, ...otherProps }) => {
    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <Route {...otherProps}>{children}</Route>
        </div>
      </div>
    );
  };

  const SecureRoute = ({ children, ...otherProps }) => {
    return authed === 1 ? (
      <PublicRoute {...otherProps}>{children}</PublicRoute>
    ) : (
      <Redirect to="/login" />
    );
  };

  return (
    <Provider store={store}>
      {authed === -1 ? (
        <div className="d-flex" style={{ width: "100vw", height: "100vh" }}>
          <Loading />
        </div>
      ) : (
        <Router>
          <NavMenu authed={authed} />
          <Switch>
            <PublicRoute exact path="/register">
              <Register />
            </PublicRoute>
            <PublicRoute exact path="/login">
              <Login setAuthed={setAuthed} />
            </PublicRoute>

            <SecureRoute exact path="/:day_no">
              <DayPage />
            </SecureRoute>
            <SecureRoute path="/">
              <Dashboard />
            </SecureRoute>
          </Switch>
        </Router>
      )}
    </Provider>
  );
}

export default App;
