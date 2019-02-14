import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import user from './userReducer';
import draft from './draftUserReducer';
import staticReducer from './staticReducer';

const rootReducer = combineReducers({
    form: reduxFormReducer,
    user,
    draft,
    static: staticReducer,
});

export default rootReducer;
