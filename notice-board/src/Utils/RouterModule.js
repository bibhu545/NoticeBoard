import React from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from '../Components/Accounts/Login';
import ViewNotices from '../Components/Notices/ViewNotices';

function RouterModule() {
    return (
        <Router>
            <Switch>
                <Route path='/view-all' component={ViewNotices}></Route>
                <Route path='/' component={Login}></Route>
            </Switch>
        </Router>
    )
}

export default RouterModule

