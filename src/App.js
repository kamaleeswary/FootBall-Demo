import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./component/layout/Layout";
import Match from "./pages/Match";
import NotFound from "./pages/NotFound";
import PlayerList from "./pages/PlayerList";
import SelectTeam from "./pages/SelectTeam";
import React from "react";
import Auth from "./component/auth/Auth";
import Winners from "./pages/Winners";
import UpdatePlayer from "./component/playersList/UpdatePlayer";
import AllMatches from "./component/matchDetails/AllMatches";
import { useSelector } from 'react-redux';
import DateTimePicker from "./component/matchDetails/DateTimePicker";


function App() {
  const token = useSelector((state) => state.auth.token);

  let isLoggedIn = token ? true : false;

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
        {!isLoggedIn && (
          <Route path="/login" exact>
            <Auth />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/logout" exact>
            <Auth />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/playersList" exact>
            <PlayerList />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/playersList/:playerName/:playerId">
            <UpdatePlayer />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/playersList/create">
            <UpdatePlayer />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/matchDetails" exact>
            <Match />
          </Route>
        )}
          {isLoggedIn && (
          <Route path="/matchDetails/allMatches" exact>
            <AllMatches />
          </Route>
        )}
          {isLoggedIn && (
          <Route path="/matchDetails/allMatches/edit">
            <DateTimePicker />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/pointsTable">
            <Winners />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/selectTeam">
            <SelectTeam />
          </Route>
        )}
        <Route path="/not-found">
          <NotFound />
        </Route>
       { isLoggedIn && <Route path="*">
          <Redirect to="/playersList" />
        </Route>}
        { !isLoggedIn && <Route path="*">
          <Redirect to="/login" />
        </Route>}
      </Switch>
      {/* </Suspense> */}
    </Layout>
  );
}

export default App;
