import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategory = createAsyncThunk('eCommerceApp/category/getCategory', async params => {
	const response = await axios.get('/api/e-commerce-app/category', { params });
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveCategory = createAsyncThunk('eCommerceApp/category/saveCategory', async category => {
	const response = await axios.post('/api/e-commerce-app/category/save', category);
	const data = await response.data;

	return data;
});

const categorySlice = createSlice({
	name: 'eCommerceApp/category',
	initialState: null,
	reducers: {
		resetCategory: () => null
	},
	extraReducers: {
		[getCategory.fulfilled]: (state, action) => action.payload,
		[saveCategory.fulfilled]: (state, action) => action.payload
	}
});

export const { resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
