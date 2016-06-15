import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';

import Welcome from './components/welcome';
import d3svg from './containers/d3';
import GroupView from './components/group_view';
import GroupDetail from './containers/group_detail';
import CreateGroup from './containers/forms/new_group_form';
import CreateTarget from './containers/forms/new_target_form';
import CreateMessage from './containers/forms/new_message_form';
import CreateHashtag from './containers/forms/new_hashtag_form';
import TargetProfile from './containers/target-profile.js';


export default (
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="groups" component={GroupView}>
        <IndexRoute component={GroupDetail} />
        <Route path="new" component={CreateGroup} />
        <Route path="target/new" component={CreateTarget} />
        <Route path="hashtag/new" component={CreateHashtag} />
        <Route path="message/new" component={CreateMessage} />
        <Route path="profile/:id" component={TargetProfile} />
      </Route>
      <Route path="d3" component={d3svg} />
    </Route>
);