// app/javascript/routes.js
import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
// import HelloWorld from './bundles/HelloWorld/components/HelloWorld';
import Posts from './bundles/posts/index';
import HomePage from './pages/HomePage';
import Result from './pages/Result'
import Questions from './pages/Questions';
import ProjectName from './components/questions/ProjectName';
import Requirement from './components/questions/Requirement';
import AppTarget from './components/questions/AppTarget';
import ProjectFeature from './components/questions/ProjectFeature';
import DevLanguage from './components/questions/DevLanguage';
import Frontend from './components/questions/Frontend';
import Database from './components/questions/Database';
import Techonology from './components/questions/Techonology';
import Infrastructure from './components/questions/Infrastructure';
import Designer from './components/questions/Designer';
import Priority from './components/questions/Priority';
import RegisterProject from './pages/RegisterProject';
import AdminDashboard from './components/questions/AdminDashboard';
import NonFunctions from './components/questions/NonFunctions';

export default () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/questions" exact component={Questions} />
      <Route path="/questions/project_name" component={ProjectName} />
      <Route path="/questions/requirement" component={Requirement} />
      <Route path="/questions/app_target" component={AppTarget} />
      <Route path="/questions/project_feature" component={ProjectFeature} />
      <Route path="/questions/dev_language" component={DevLanguage} />
      <Route path="/questions/frontend" component={Frontend} />
      <Route path="/questions/admin_dashboard" component={AdminDashboard} />
      <Route path="/questions/database" component={Database} />
      <Route path="/questions/technology" component={Techonology} />
      <Route path="/questions/non_functions" component={NonFunctions} />
      <Route path="/questions/infrastructure" component={Infrastructure} />
      <Route path="/questions/designer" component={Designer} />
      <Route path="/questions/priority" component={Priority} />
      <Route path="/result" component={Result} />
      <Route path="/register_project" component={RegisterProject} />
    </Switch>
  );
}
