import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';

import './Blog.css';

import Posts from './Posts/Posts';

// * Lazy Loading
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

const asyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost');
});

class Blog extends Component {
  renderNavMenu = () => (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/posts"
            activeStyle={{
              color: '#d82000',
              textDecoration: 'underline'
            }}
            exact
          >
            Posts
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName="active"
            to={{
              pathname: '/new-post'
              // search: 'quick-submit=true'
              // hash: 'submit',
            }}
          >
            New Post
          </NavLink>
        </li>
      </ul>
    </nav>
  );

  render() {
    const navigationsLinks = <header>{this.renderNavMenu()}</header>;
    const hStyle = { textAlign: 'center', color: 'red', fontSize: '22px' };
    return (
      <div className="Blog">
        {navigationsLinks}
        {/* Switch loads the first Route it faces (order of routes is important!) */}
        <Switch>
          <Route path="/new-post" component={asyncNewPost} />
          <Route path="/posts" component={Posts} />
          {/* catches any unknown route and renders custom component (should always come last) */}
          <Route render={() => <h1 style={hStyle}>Page was not found!</h1>} />
          {/* Redirect Component changes the URL */}
          {/* <Redirect from="/" to="/posts" /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
