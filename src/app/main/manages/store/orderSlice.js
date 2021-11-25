import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import restaurantService from 'app/services/restaurantService';
import moment from 'moment';

export const getOrders = createAsyncThunk('restaurantApp/order/getOrders', async () => {
	const response = await restaurantService.getOrders();
	const data = response.data
    .filter(order => order.status !== 'processing')
    .sort((o1, o2) => {
        return moment(o1.updatedTime).isBefore(o2.updatedTime) ? 1 : -1;
    });
	return data;
});

export const updateOrderStatus = createAsyncThunk('restaurantApp/order/updateOrderStatus', async ({id, status}) => {
	const response = await restaurantService.updateOrderStatus(id, {status});
	const data = response.data;
	return data;

});

const orderAdapter = createEntityAdapter({});

export const { selectAll: selectOrders, selectById: selectOrderById } = orderAdapter.getSelectors(
	state => state.restaurantApp.order
);

export const isLoading = state => state.restaurantApp.order.loading

export const getOrderByParam = createSelector(
	selectOrders,
	(_, props) => props,
	(orders, props) => {
		console.log(props);
		return orders;
	}
)

export const getOrderById = (id) => (state) => {
	return selectOrderById(state, id)
}

const orderSlice = createSlice({
	name: 'restaurantApp/order',

	initialState: orderAdapter.getInitialState({
		loading: false,
	}),
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
	extraReducers: {
		[getOrders.pending]: (state) => {
			state.loading = true;
		},

		[getOrders.fulfilled]: (state, action) => {
			const data = action.payload;
			orderAdapter.setAll(state, data);
			state.loading = false;
		},

		[updateOrderStatus.fulfilled]: orderAdapter.upsertOne,
	}

});

export const {
	setOrder
} = orderSlice.actions;

export default orderSlice.reducer;
