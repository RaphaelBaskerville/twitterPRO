import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';

import Welcome from './components/welcome';
import GroupView from './components/group_view';
import GroupDetail from './containers/group_detail';
import CreateGroup from './containers/forms/new_group_form';


export default (
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="groups" component={GroupView}>
        <IndexRoute component={GroupDetail} />
        <Route path="create" component={CreateGroup} />
      </Route>
    </Route>
);