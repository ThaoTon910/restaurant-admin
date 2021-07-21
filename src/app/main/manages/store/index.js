import { combineReducers } from '@reduxjs/toolkit';
import category from './categorySlice';
import categories from './categoriesSlice';

const reducer = combineReducers({
	categories,
	category
});

export default reducer;
