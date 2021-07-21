import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import restaurantService from '../../../services/restaurantService';


export const getOrders = createAsyncThunk('eCommerceApp/categories/getOrders', async () => {
	const response = await restaurantService.getCategories();
	const data = await response.data;

	return data;
});

export const removeOrders = createAsyncThunk(
	'eCommerceApp/categories/removeOrders',
	async (orderIds, { dispatch, getState }) => {
		await axios.post('/api/e-commerce-app/remove-orders', { orderIds });

		return orderIds;
	}
);

const ordersAdapter = createEntityAdapter({});

export const { selectAll: selectOrders, selectById: selectOrderById } = ordersAdapter.getSelectors(
	state => state.eCommerceApp.orders
);

const ordersSlice = createSlice({
	name: 'eCommerceApp/orders',
	initialState: ordersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setOrdersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getOrders.fulfilled]: ordersAdapter.setAll,
		[removeOrders.fulfilled]: (state, action) => ordersAdapter.removeMany(state, action.payload)
	}
});

export const { setOrdersSearchText } = ordersSlice.actions;

export default ordersSlice.reducer;
