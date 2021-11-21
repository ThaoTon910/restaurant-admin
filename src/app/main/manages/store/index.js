import { combineReducers } from '@reduxjs/toolkit';
import categories from './categoriesSlice';
import menuItems from './menuItemsSlice';
import addons from './addonSlice';
import orders from './ordersSlice';
import order from './orderSlice';


const reducer = combineReducers({
	categories,
	menuItems,
	addons,
	orders,
	order
});

export default reducer;
