import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import restaurantService from '../../../services/restaurantService';


export const getCategories = createAsyncThunk('eCommerceApp/categories/getCategories', async () => {
	const response = await restaurantService.getCategories();
	const data = await response.data;

	return data;
});


const CategoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoryById } = CategoriesAdapter.getSelectors(
	state => state.eCommerceApp.categories
);

const categoriesSlice = createSlice({
	name: 'eCommerceApp/Categories',
	initialState: CategoriesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCategoriesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCategories.fulfilled]: CategoriesAdapter.setAll,
	}
});

export const { setCategoriesSearchText } = categoriesSlice.actions;

export default categoriesSlice.reducer;
