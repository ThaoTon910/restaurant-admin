import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import restaurantService from '../../../services/restaurantService';

export const getOrder = createAsyncThunk('restaurantApp/order/getOrder', async params => {
	const response = await await restaurantService.getOrderById(params.orderId);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveOrder = createAsyncThunk('restaurantApp/order/saveOrder', async order => {
	const response = await axios.post('/api/e-commerce-app/order/save', order);
	const data = await response.data;

	return data;
});

const orderSlice = createSlice({
	name: 'restaurantApp/order',
	initialState: null,
	reducers: {
		resetOrder: () => null
	},
	extraReducers: {
		[getOrder.fulfilled]: (state, action) => action.payload,
		[saveOrder.fulfilled]: (state, action) => action.payload
	}
});

export const { resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
