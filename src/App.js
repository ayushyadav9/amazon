import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import { useEffect } from 'react'
import { auth } from "./firebase";
import { useStateValue } from "./components/context/StateProvider";
// import CartOverlay from "./components/CartOverlay";

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);
      if (authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Router>
      <div className="App">
        <Header></Header>
        {/* <CartOverlay/> */}
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/checkout">
            <Checkout></Checkout>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
