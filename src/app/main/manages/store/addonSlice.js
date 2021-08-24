import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import restaurantService from 'app/services/restaurantService';

export const getAddonGroups = createAsyncThunk('restaurantApp/addons/getAddonGroups', async () => {
    const response = await restaurantService.getAddonGroups();
    const data = await response.data;

    return data;
});

export const addAddon = createAsyncThunk('restaurantApp/addons/addAddon', async (data) => {
    const response = await restaurantService.addAddon(data);
    console.log(response)
    return response.data;
})

export const updateAddon = createAsyncThunk('restaurantApp/addons/updateAddon', async ({ id, data }) => {
    const response = await restaurantService.updateAddon(id, data);
    console.log(response)
    return response.data;
})

export const deleteAddon = createAsyncThunk('restaurantApp/addons/deleteAddon', async (id) => {
	const response = await restaurantService.deleteAddon(id);
	return response.data;
})



const addonGroupAdapter = createEntityAdapter({});

export const { selectAll: selectAddonGroups, selectById: selectAddonGroupById } = addonGroupAdapter.getSelectors(
    state => state.restaurantApp.addons
);

const addonSlice = createSlice({
    name: 'restaurantApp/addons',
    initialState: addonGroupAdapter.getInitialState({
        loading: false,
        groupDialog: {
            type: 'new',
            props: {
                open: false
            },
            data: null
        },
        itemDialog: {
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

        openNewAddonItemDialog: (state, action) => {
            state.itemDialog = {
                type: 'new',
                props: {
                    open: true
                },
                data: {
                    addonGroupId: action.payload
                }
            }
        },

        openEditAddonItemDialog: (state, action) => {
            state.itemDialog = {
                type: 'edit',
                props: {
                    open: true
                },
                data: action.payload
            }
        },

        closeAddonItemDialog: (state) => {
            state.itemDialog = {
                type: 'edit',
                props: {
                    open: false
                },
                data: null
            }
        }

    },
    extraReducers: {
        [getAddonGroups.fulfilled]: (state, action) => {
            const data = action.payload;
            addonGroupAdapter.setAll(state, data);
            state.loading = false;
        },

        [addAddon.fulfilled]: (state, action) => {
            const { id, addonGroupId } = action.payload;
            const oldAddons = state.entities[addonGroupId]?.addons;
            if (!oldAddons) { return; }
            const newAddons = oldAddons.concat(action.payload)

            addonGroupAdapter.updateOne(
                state,
                {
                    id: addonGroupId,
                    changes: { addons: newAddons }
                })
        },


        [updateAddon.fulfilled]: (state, action) => {
            const { id, addonGroupId } = action.payload;
            const oldAddons = state.entities[addonGroupId]?.addons;
            if (!oldAddons) { return; }
            const updatedIndex = oldAddons.findIndex(item => item.id === id);
            const newAddons = [
                ...oldAddons.slice(0, updatedIndex),
                action.payload,
                ...oldAddons.slice(updatedIndex + 1)
            ]
            addonGroupAdapter.updateOne(
                state,
                {
                    id: addonGroupId,
                    changes: { addons: newAddons }
                })
        },

        [deleteAddon.fulfilled]: (state, action) => {
            const { id, addonGroupId } = action.payload;
            const oldAddons = state.entities[addonGroupId]?.addons;
            if (!oldAddons) { return; }
            const newAddons = oldAddons.filter(item => item.id !== id)

            addonGroupAdapter.updateOne(
                state,
                {
                    id: addonGroupId,
                    changes: { addons: newAddons }
                })
        },
    }

});

export const {
    setLoading,
    openNewAddonItemDialog,
    openEditAddonItemDialog,
    closeAddonItemDialog
} = addonSlice.actions;

export default addonSlice.reducer;
