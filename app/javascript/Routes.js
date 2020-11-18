// app/javascript/routes.js
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
// import HelloWorld from './bundles/HelloWorld/components/HelloWorld';
import Posts from './bundles/posts/index';
import HomePage from './pages/HomePage';
import RegisterAs from "./pages/RegisterAs";
import UploadList from "./pages/UploadList";
import UserDetail from './pages/UserDetail';

export default () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/register_as" exact component={RegisterAs} />
      <Route path="/upload_list" exact component={UploadList} />
      <Route path="/user_detail/:id" component={UserDetail} />
    </Switch>
  );
}
