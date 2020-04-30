import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posts from './view/Posts/Posts';
import Login from './view/Login/Login';
import Detail from './view/Detail/Detail';


class App extends Component {

    render() {
        if (!localStorage.getItem('user')) {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route path="/" name="login" component={Login} />
                    </Switch>
                </BrowserRouter>
            )
        } else {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/posts" name="posts" component={Posts} />
                        <Route exact path="/detail/:id" name="detail" component={Detail} />
                        <Route path="/" name="posts" component={Posts} />
                    </Switch>
                </BrowserRouter>
            )
        };
    }
}

export default App;