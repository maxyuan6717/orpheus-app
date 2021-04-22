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
import { Spinner } from "react-bootstrap";
import axios from "axios";
import store from "./store";
import "./common/typography.css";

function App() {
  const [authed, setAuthed] = useState(-1);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const onMount = async () => {
      const auth = await checkUser();
      console.log(auth);
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
        <Spinner
          className="m-auto"
          animation="border"
          role="status"
          style={{ width: "100px", height: "100px" }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Router>
          <NavMenu />
          <Switch>
            <PublicRoute exact path="/register">
              <Register />
            </PublicRoute>
            <PublicRoute exact path="/login">
              <Login setAuthed={setAuthed} />
            </PublicRoute>
            {/* <MyRoute exact path="/:id">
            <Dashboard />
          </MyRoute>
          <MyRoute exact path="/:id/:day_no">
            <DayPage />
          </MyRoute> */}
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
