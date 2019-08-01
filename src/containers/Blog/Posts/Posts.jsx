import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import axiosInstance from '../../../axios';
import FullPost from '../FullPost/FullPost';

import './Posts.css';

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    // console.log(this.props);
    axiosInstance
      .get('/posts')
      .then(({ data }) => {
        const result = data.slice(0, 4);
        const posts = result.map(post => ({
          ...post,
          author: 'Max'
        }));
        this.setState({ posts });
      })
      .catch(err => {
        console.log(err);
        // this.setState({ error: true });
      });
  }

  postSelectedHandler = id => () => {
    // adds new path to the history arr
    const { history } = this.props;
    history.push({ pathname: `/posts/${id}` });
  };

  renderPosts = () => {
    const { posts } = this.state;
    if (!posts.length) return null;
    return posts.map(({ id, title, author }) => (
      <Post
        key={id}
        title={title}
        author={author}
        clicked={this.postSelectedHandler(id)}
      />
    ));
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>All Posts:</h1>
        <section className="Posts">{this.renderPosts()}</section>
        {/* Nested Route */}
        <Route path={`${match.url}/:id`} component={FullPost} exact />
      </div>
    );
  }
}

export default Posts;
