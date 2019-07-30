import axios from 'axios';

// * creating multiple instances of axios obj for different modules
const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// * using interceptors for instance is allowed
// instance.interceptors.request...
// instance.interceptors.response...

export default instance;
