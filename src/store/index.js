import {legacy_createStore as createStore , applyMiddleware, compose} from 'redux';
import reducers from '../reducer/index';
import thunk from 'redux-thunk';

const store = createStore(reducers, undefined, compose(applyMiddleware(thunk),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;