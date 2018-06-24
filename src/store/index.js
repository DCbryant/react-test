import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f;

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevtools
));

export default store;