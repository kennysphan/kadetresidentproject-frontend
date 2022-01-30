import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Settings from "./components/settings.component";
import Criteria from "./components/criterion.component";
import ListRequests from "./components/view_requests.component";
import NotFound from "./components/NotFound";
import history from './history';
import check_availability from "./components/check_availability";
import AlgorithmStatus from "./components/algorithm.component";
import PreSchedule from "./components/pre_algorithm.component";
import GeneratedSchedule from "./components/post_algorithm.component";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Settings" component={Settings} />
                    <Route path="/Rotations" component={Criteria} />
                    <Route path="/view_requests" component={ListRequests} />
                    <Route path="/check_availability" component={check_availability} />
                    <Route path="/algorithm" component={AlgorithmStatus} />
                    <Route path="/pre_algorithm" component={PreSchedule} />
                    <Route path="/post_algorithm" component={GeneratedSchedule} />
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        )
    }
}