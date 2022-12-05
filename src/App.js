import { Redirect, Route, Switch } from "react-router-dom";
import Layout from './component/layout/Layout'
import Match from "./pages/Match";
import NotFound from "./pages/NotFound";
import PlayerList from "./pages/PlayerList";
import SelectTeam from "./pages/SelectTeam";
import React, { useContext, useEffect } from "react";
import Auth from "./component/auth/Auth";
import Winners from "./pages/Winners";
import AuthContext from "./store/AuthContext";

function App() {
  const authCtx = useContext(AuthContext);
  let isLoggedIn = authCtx.isLoggedIn;

  console.log(isLoggedIn)


  return (
    <Layout>
      {/* <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      > */}
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          {!isLoggedIn && <Route path="/login" exact>
            <Auth />
          </Route>}
         { isLoggedIn  && <Route path="/logout" exact>
            <Auth />
          </Route> }
          { isLoggedIn  && <Route path="/playersList">
            <PlayerList />
          </Route>}
          { isLoggedIn  && <Route path="/matchDetails">
            <Match />
            </Route>
          }
          { isLoggedIn  && <Route path="/winners">
            <Winners />
          </Route>}
          { isLoggedIn  && <Route path="/selectTeam">
            <SelectTeam />
          </Route> }
          <Route path="/not-found">
            <NotFound />
          </Route>
          <Route path="*">
            <Redirect to="/not-found" />
          </Route>
        </Switch>
      {/* </Suspense> */}
    </Layout>
  );
}

export default App;
