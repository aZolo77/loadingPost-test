import React, { Component } from 'react';
import Axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  componentDidMount() {
    Axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(({ data }) => {
        const result = data.slice(0, 4);
        const posts = result.map(post => ({
          ...post,
          author: 'Max'
        }));
        this.setState({ posts });
      })
      .catch(err => {
        this.setState({ error: true });
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
      <Post
        key={id}
        title={title}
        author={author}
        clicked={this.postSelectedHandler(id)}
      />
    ));
  };

  render() {
    const { selectedPostId, error } = this.state;

    return (
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>All Posts:</h1>
        <section className="Posts">
          {error ? (
            <p style={{ color: 'red', fontWeight: 'bold' }}>
              Something went wrong!
            </p>
          ) : (
            this.renderPosts()
          )}
        </section>
        <section>
          <FullPost id={selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
