import React, { Component } from 'react';
// import FullPost from '../FullPost/FullPost';
import Post from '../../../components/Post/Post';
import axiosInstance from '../../../axios';
import { Link } from 'react-router-dom';

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
    this.setState({
      selectedPostId: id
    });
  };

  renderPosts = () => {
    const { posts } = this.state;
    if (!posts.length) return null;
    return posts.map(({ id, title, author }) => (
      <Link key={id} to={{ pathname: `/posts/${id}` }}>
        <Post
          title={title}
          author={author}
          clicked={this.postSelectedHandler(id)}
        />
      </Link>
    ));
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>All Posts:</h1>
        <section className="Posts">{this.renderPosts()}</section>
      </div>
    );
  }
}

export default Posts;
