import { combineReducers } from '@reduxjs/toolkit';
import categories from './categoriesSlice';
import menuItems from './menuItemsSlice';


const reducer = combineReducers({
	categories,
	menuItems
});

export default reducer;
