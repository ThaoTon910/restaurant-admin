import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import restaurantService from '../../../services/restaurantService';


export const getMenuItems = createAsyncThunk('restaurantApp/menuItems/getMenuItems', async () => {
	const response = await restaurantService.getMenuItems();
	const data = await response.data;

	return data;
});


export const addMenuItem = createAsyncThunk('restaurantApp/menuItems/addMenuItem', async (data) => {
	const response = await restaurantService.addMenuItem(data);
	return response.data;
})

export const updateMenuItem = createAsyncThunk('restaurantApp/menuItems/updateMenuItem', async ({id, data}) => {
	const response = await restaurantService.updateMenuItem(id, data);
	return response.data;
})

export const deleteMenuItem = createAsyncThunk('restaurantApp/menuItems/deleteMenuItem', async (id) => {
	const response = await restaurantService.deleteMenuItem(id);
	return response.data;
})


const menuItemsAdapter = createEntityAdapter({});

export const { selectAll: selectMenuItems, selectById: selectMenuItemById } = menuItemsAdapter.getSelectors(
	state => state.restaurantApp.menuItems
);

const menuItemsSlice = createSlice({
	name: 'restaurantApp/MenuItems',
	initialState: menuItemsAdapter.getInitialState({
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
		openNewMenuItemDialog: (state, action) => {
			state.dialog = {
				type: 'new',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeNewMenuItemDialog: (state, action) => {
			state.dialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditMenuItemDialog: (state, action) => {
			state.dialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditMenuItemDialog: (state, action) => {
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
		[getMenuItems.fulfilled]: (state, action) => {
			const data = action.payload;
			menuItemsAdapter.setAll(state, data);
			state.loading = false;
		}
	}
});

export const {
	setLoading,
	openNewMenuItemDialog,
	closeNewMenuItemDialog,
	openEditMenuItemDialog,
	closeEditMenuItemDialog
} = menuItemsSlice.actions;

export default menuItemsSlice.reducer;
