import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// * global axios default config
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// * Ways of accessing global axios configuration
axios.interceptors.request.use(
  reqConfig => {
    // console.log(reqConfig);
    // edit request config before sending it to the server
    return reqConfig;
  },
  err => {
    // console.log(err);
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  response => {
    // console.log(response);
    // edit response
    return response;
  },
  err => {
    // console.log(err);
    return Promise.reject(err);
  }
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
