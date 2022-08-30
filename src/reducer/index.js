import {combineReducers} from 'redux';
import reducer_getSoliders from './reducer_getSolidersList';
import reducer_getSoliderInfo from './reducer_getSoliderInfo';

const reducers = combineReducers({
    reducer_getSoliders,
    reducer_getSoliderInfo,

});

export default reducers;