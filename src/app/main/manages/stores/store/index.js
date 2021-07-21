import { combineReducers } from '@reduxjs/toolkit';
import stores from './storesSlice';

const reducer = combineReducers({
	stores
});

export default reducer;
