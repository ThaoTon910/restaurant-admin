import { combineReducers } from '@reduxjs/toolkit';
import categories from './categoriesSlice';
import menuItems from './menuItemsSlice';
import addons from './addonSlice';


const reducer = combineReducers({
	categories,
	menuItems,
	addons
});

export default reducer;
