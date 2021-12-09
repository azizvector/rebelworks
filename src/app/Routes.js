import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Switch, Route } from "react-router-dom";
import { Header } from "../components";
import { HomePage } from "./pages/HomePage";
import { DetailPage } from "./pages/DetailPaga";
import { ErrorPage } from "./pages/ErrorPage";
import { fetchGenres } from "../redux/genres/genresActions";


export function Routes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGenres());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="d-flex flex-column flex-root header-fixed">
      <div className="d-flex flex-column flex-column-fluid">
        <div className="d-flex flex-column flex-row-fluid">
          <Header />
          <Switch>
            <Redirect exact from="/" to="/movies" />
            <Route path="/movies" exact component={HomePage} />
            <Route path="/movies/:id" component={DetailPage} />
            <Route path="/error" component={ErrorPage} />
            <Redirect to="/error" />
          </Switch>
        </div>
      </div>
    </div>
  );
}
