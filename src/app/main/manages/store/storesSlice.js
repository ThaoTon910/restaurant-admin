// import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
// import restaurantService from 'app/services/restaurantService';
//
// export const getMerchant = createAsyncThunk('restaurantApp/merchant/getMerchant', async () => {
// 	const response = await restaurantService.getAddonGroups();
// 	const data = await response.data;
//
// 	return data;
// });
//
// // export const addMerchant = createAsyncThunk('restaurantApp/merchant/addMerchant', async (data) => {
// // 	const response = await restaurantService.addMerchant(data);
// // 	console.log(response)
// // 	return response.data;
// // })
//
// export const updateMerchant = createAsyncThunk('restaurantApp/merchant/updateMerchant', async ({ id, data }) => {
// 	const response = await restaurantService.updateMerchant(id, data);
// 	console.log(response)
// 	return response.data;
// })
//
// // export const deleteMerchant = createAsyncThunk('restaurantApp/merchant/deleteMerchant', async (id) => {
// // 	const response = await restaurantService.deleteMerchant(id);
// // 	return response.data;
// // })
//
// const merchantSlice = createSlice({
// 	name: 'restaurantApp/merchant',
// 	initialState: {
// 		loading: false,
// 		merchant: null
// 	},
// 	reducers: {
// 		setLoading: (state, action) => {
// 			state.loading = action.payload;
// 		},
//
//
// 	},
//
// });
//
// export const {
// 	setLoading,
// 	openNewAddonItemDialog,
// 	openEditAddonItemDialog,
// 	closeAddonItemDialog
// } = addonSlice.actions;
//
// export default addonSlice.reducer;
