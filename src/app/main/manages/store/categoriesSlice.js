import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import restaurantService from '../../../services/restaurantService';


export const getCategories = createAsyncThunk('restaurantApp/categories/getCategories', async () => {
	const response = await restaurantService.getCategories();
	const data = await response.data;

	return data;
});


export const addCategory = createAsyncThunk(
	'restaurantApp/categories/addCategory',
	async (category, { dispatch, getState }) => {
		const response = await restaurantService.addCategory(category);
		const data = await response.data;

		return data;
	}
);

export const updateCategory = createAsyncThunk(
	'restaurantApp/categories/updateCategory',
	async (category, { dispatch, getState }) => {
		const response = await restaurantService.updateCategory(category.id, category)
		const data = await response.data;

		return data;
	}
);

export const removeCategory = createAsyncThunk(
	'restaurantApp/categories/deleteCategory',
	async (category, { dispatch, getState }) => {
		const response = await restaurantService.deleteCategory(category.id)
		const data = await response.data;

		return data;
	}
);


const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoryById } = categoriesAdapter.getSelectors(
	state => state.restaurantApp.categories
);

const categoriesSlice = createSlice({
	name: 'restaurantApp/categories',
	initialState: categoriesAdapter.getInitialState({
		loading: false,
		dialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		openNewCategoryDialog: (state, action) => {
			state.dialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeNewCategoryDialog: (state, action) => {
			state.dialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditCategoryDialog: (state, action) => {
			state.dialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditCategoryDialog: (state, action) => {
			state.dialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[getCategories.fulfilled]: (state, action) => {
			const data = action.payload;
			categoriesAdapter.setAll(state, data);
			state.loading = false;
		},
		[addCategory.fulfilled]: categoriesAdapter.addOne,
		[updateCategory.fulfilled]: categoriesAdapter.upsertOne,
		[removeCategory.fulfilled]: (state, action) => categoriesAdapter.removeOne(state, action.payload)
	}
});

export const {
	setLoading,
	openNewCategoryDialog,
	closeNewCategoryDialog,
	openEditCategoryDialog,
	closeEditCategoryDialog
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
