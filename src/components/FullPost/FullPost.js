import React, { Component } from 'react';
import Axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  };

  componentDidUpdate() {
    const { loadedPost } = this.state;
    const { id } = this.props;
    if (id) {
      if (!loadedPost || (loadedPost && loadedPost.id !== id)) {
        Axios.get(`/posts/${id}`).then(({ data }) => {
          this.setState({ loadedPost: data });
        });
      }
    }
  }

  deletePostHandler = id => () => {
    Axios.delete(`/posts/${id}`).then(res => {
      console.log(res);
    });
  };

  render() {
    const { loadedPost } = this.state;
    const { id } = this.props;

    const textStyle = {
      textAlign: 'center',
      padding: '10px',
      border: '1px solid #999',
      width: '250px',
      margin: '10px auto'
    };

    let post = <p style={textStyle}>Please select a Post!</p>;

    if (id) {
      post = <p style={textStyle}>Loading...</p>;
    }

    post = loadedPost ? (
      <div className="FullPost">
        <h1>{loadedPost.title}</h1>
        <p>{loadedPost.body}</p>
        <div className="Edit">
          <button className="Delete" onClick={this.deletePostHandler(id)}>
            Delete
          </button>
        </div>
      </div>
    ) : (
      post
    );
    return post;
  }
}

export default FullPost;
