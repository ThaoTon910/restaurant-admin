import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';


import { closeAddonGroupDialog, addAddonGroup, updateAddonGroup } from 'app/main/manages/store/addonSlice'


const defaultValues = {
    name: '',
    minQuantity: 1,
    maxQuantity: 1
};

/**
 * Form Validation Schema
 */
 const schema = yup.object().shape({
	name: yup.string().required('You must enter a name'),
    minQuantity: yup.number(),
    maxQuantity: yup.number()
});

function AddonGroupDialog(props) {
    const dispatch = useDispatch();
    const dialog = useSelector(({ restaurantApp }) => restaurantApp.addons.groupDialog);
    const { control, reset, handleSubmit, formState, getValues, setValue } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema)
    });

    const { isValid, dirtyFields, errors } = formState;

    const [choiceType, setChoiceType] = useState("pickOne")
    const onChoiceTypeChange = (e) => {
        const value = e.target.value;
        setChoiceType(value)
        if (value === "pickOne") {
            setValue('minQuantity', 1)
            setValue('maxQuantity', 1)
        } else if (value === "pickAny") {
            setValue('minQuantity', 0)
            setValue('maxQuantity', null)
        }

    }

    /**
     * Initialize Dialog with Data
     */
    const initDialog = useCallback(() => {
        /**
         * Dialog type: 'edit'
         */
        if (dialog.type === 'edit' && dialog.data) {
            const {name, minQuantity, maxQuantity} = dialog.data
            reset({
                name,
                minQuantity,
                maxQuantity
            });

            if(minQuantity === 1 && maxQuantity === 1) {
                setChoiceType("pickOne")
            } else if (minQuantity === 0 && maxQuantity === null) {
                setChoiceType("pickAny")
            } else {
                setChoiceType("custom")
            }
        }

    }, [dialog.data, dialog.type, reset]);

    /**
     * On Dialog Open
     */
    useEffect(() => {
        if (dialog.props.open) {
            initDialog();
        }
    }, [dialog.props.open, initDialog]);

    /**
     * Close Dialog
     */
    function closeComposeDialog() {
        dispatch(closeAddonGroupDialog())
    }

    /**
     * Form Submit
     */
    function onSubmit(data) {
        if (dialog.type === 'new') {
            dispatch(addAddonGroup(data));
        } else {
            dispatch(updateAddonGroup({ id: dialog.data.id, data}));
        }
        closeComposeDialog();
    }

    return (
        <Dialog
            classes={{
                paper: 'm-24'
            }}
            {...dialog.props}
            onClose={closeComposeDialog}
            fullWidth
            maxWidth="xs"
        >
            <AppBar position="static" elevation={0}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {dialog.type === 'new' ? 'New Addon Group' : 'Edit Addon Group'}
                    </Typography>
                </Toolbar>
            </AppBar>
            <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">
                <DialogContent classes={{ root: 'p-24' }}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">info</Icon>
                        </div>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mb-24"
                                    label="Name"
                                    id="name"
                                    autoComplete="off"
                                    error={!!errors.name}
                                    helperText={errors?.name?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">info</Icon>
                        </div>
                        <FormControl fullWidth className="mb-24">

                            <InputLabel id="addon-choice-label">Addon Choice type</InputLabel>
                            <Select value={choiceType} onChange={onChoiceTypeChange} variant="outlined" >

                                <MenuItem value="pickOne">Pick one only</MenuItem>
                                <MenuItem value="pickAny">Pick any</MenuItem>
                                <MenuItem value="custom">Custom</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    {choiceType === "custom" && (
                        <>
                            <div className="flex">
                                <div className="min-w-48 pt-20">
                                    <Icon color="action">info</Icon>
                                </div>
                                <Controller
                                    control={control}
                                    name="minQuantity"
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            className="mb-24 mr-24"
                                            label="Minimum"
                                            id="minimum"
                                            autoComplete="off"
                                            error={!!errors.minQuantity}
                                            helperText={errors?.minQuantity?.message}
                                            variant="outlined"
                                            required
                                        />
                                    )}
                                />

                                <div className="flex">

                                    <Controller
                                        control={control}
                                        name="maxQuantity"
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className="mb-24"
                                                label="maximum"
                                                id="maximum"
                                                autoComplete="off"
                                                error={!!errors.maxQuantity}
                                                helperText={errors?.maxQuantity?.message}
                                                variant="outlined"
                                                required
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </>

                    )}


                    <DialogActions className="justify-between p-4 pb-16">
                        <Button variant="contained" color="default" onClick={closeComposeDialog}>
                            Cancel
						</Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            disabled={_.isEmpty(dirtyFields) || !isValid}
                        >
                            {dialog.type === 'new' ? 'Add' : 'Save'}
                        </Button>
                    </DialogActions>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default AddonGroupDialog;
