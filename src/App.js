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
  useHistory,
} from "react-router-dom";
import { checkUser } from "./util/api";
import axios from "axios";
import "./common/typography.css";
import Loading from "./components/loading";
import ReactGA from "react-ga";
import { GA_id } from "./util/base";

ReactGA.initialize(GA_id);

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
    const history = useHistory();
    ReactGA.set({ page: history.location.pathname });
    ReactGA.pageview(history.location.pathname);
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
    <>
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
    </>
  );
}

export default App;
