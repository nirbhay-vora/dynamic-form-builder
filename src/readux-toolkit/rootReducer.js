import { combineReducers } from '@reduxjs/toolkit';
import dynamicFormReducer from './feature/dynamicForm';
import formValueReducer from './feature/formValue'

const rootReducer = combineReducers({
    dynamicForm: dynamicFormReducer,
    formValueReducer
});

export default rootReducer;
