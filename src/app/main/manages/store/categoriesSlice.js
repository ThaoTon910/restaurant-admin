import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import restaurantService from '../../../services/restaurantService';
import { addMenuItem, deleteMenuItem, updateMenuItem } from './menuItemsSlice';

export const getCategories = createAsyncThunk('restaurantApp/categories/getCategories', async () => {
	const response = await restaurantService.getCategories();
	const data = await response.data;

	return data;
});


export const addCategory = createAsyncThunk(
	'restaurantApp/categories/addCategory',
	async (data) => {
		const response = await restaurantService.addCategory(data);
		return response.data;
	}
);

export const updateCategory = createAsyncThunk(
	'restaurantApp/categories/updateCategory',
	async (category, { dispatch, getState }) => {
		const response = await restaurantService.updateCategory(category.id, category)

		return response.data;
	}
);

export const removeCategory = createAsyncThunk(
	'restaurantApp/categories/deleteCategory',
	async (category, { dispatch, getState }) => {
		const response = await restaurantService.deleteCategory(category.id)

		return response.data;
	}
);


const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoryById } = categoriesAdapter.getSelectors(
	state => state.restaurantApp.categories
);

export const selectMenuItems = createSelector(
	selectCategories,
	(categories) => {
		const items = {};
		categories
			.map(cat => cat.menuItems)
			.flat()
			.forEach(item => {
				items[item.id] = item
			});

		return items;
	}
)

export const selectMenuItemById = (id) => (state) => {
	const menuItems = selectMenuItems(state);
	if (id in menuItems) {
		return menuItems[id];
	}
	return undefined;

}

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
		[removeCategory.fulfilled]: (state, action) => categoriesAdapter.removeOne(state, action.payload.id),

		[addMenuItem.fulfilled]: (state, action) => {
			const { id, categoryId } = action.payload;
			const oldMenuItems = state.entities[categoryId]?.menuItems;
			if (!oldMenuItems) { return; }
			const newMenuItems = oldMenuItems.concat(action.payload)

			categoriesAdapter.updateOne(
				state,
				{
					id: categoryId,
					changes: { menuItems: newMenuItems }
				})
		},

		[deleteMenuItem.fulfilled]: (state, action) => {
			const { id, categoryId } = action.payload;
			const oldMenuItems = state.entities[categoryId]?.menuItems;
			if (!oldMenuItems) { return; }
			const newMenuItems = oldMenuItems.filter(item => item.id !== id)

			categoriesAdapter.updateOne(
				state,
				{
					id: categoryId,
					changes: { menuItems: newMenuItems }
				})
		},

		[updateMenuItem.fulfilled]: (state, action) => {
			const { id, categoryId } = action.payload;
			const oldMenuItems = state.entities[categoryId]?.menuItems;
			if (!oldMenuItems) { return; }
			const updatedIndex = oldMenuItems.findIndex(item => item.id === id);
			const newMenuItems = [
				...oldMenuItems.slice(0, updatedIndex),
				action.payload,
				...oldMenuItems.slice(updatedIndex + 1)
			]
			categoriesAdapter.updateOne(
				state,
				{
					id: categoryId,
					changes: { menuItems: newMenuItems }
				})
		}
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
