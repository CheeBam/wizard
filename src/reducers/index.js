import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import user from './userReducer';
import staticReducer from './staticReducer';

const rootReducer = combineReducers({
    form: reduxFormReducer,
    user,
    static: staticReducer,
});

export default rootReducer;
