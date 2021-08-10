import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';
import { v4 as uuid } from "uuid";



import { Storage } from 'aws-amplify';
import { addMenuItem, closeEditMenuItemDialog, closeNewMenuItemDialog, updateMenuItem } from '../store/menuItemsSlice';


const AddonPicker = () => {
	const { control, register } = useForm();
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: "test", // unique name for your Field Array
		// keyName: "id", default to "id", you can change the key name
	});

	return (
		<React.Fragment>
			<IconButton className="px-5 mr-4 text-green-500 block" onClick={() => append({ test: 'test' })}>
				<Icon>add_circle</Icon>
			</IconButton>
			{
				fields.map((field, index) => (

					<div key={field.id} className="m-5">

					<Select defaultValue={field.value} fullWidth id="select" value="20">
						<MenuItem value="10">Ten</MenuItem>
						<MenuItem value="20">Twenty</MenuItem>
					</Select>
					</div>
				))
			}
		</React.Fragment>
	);
}

const defaultValues = {
	name: '',
	description: '',
	size: '',
	storeId: '',
	price: '',
	categoryId: '',
	imageUrl: null
};



function ServicetDialog(props) {
	const dispatch = useDispatch();
	const [image, setImage] = useState({ file: null, preview: "", dirty: false });
	const dialog = useSelector((state) => state.restaurantApp.menuItems.dialog);
	const { control, reset, handleSubmit, formState, getValues, setValue } = useForm({
		mode: 'onChange',
		defaultValues,
	});

	const { isValid, dirtyFields, errors } = formState;

	/**
	 * Initialize Dialog with Data
	 */
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (dialog.type === 'edit' && dialog.data) {

			const { name, description, size, price, imageUrl } = dialog.data

			reset({
				name,
				description,
				size,
				price,
				imageUrl,
				categoryId: dialog.data.category.id,
				storeId: dialog.data.category.storeId
			});

			if (dialog.data.imageUrl) {
				Storage.get(dialog.data.imageUrl).then(url => setImage({ file: null, preview: url, dirty: false }));
			} else {
				setImage({ file: null, preview: "", dirty: false });
			}
		}

		/**
		 * Dialog type: 'new'
		 */
		if (dialog.type === 'new') {
			reset({
				...defaultValues,
				categoryId: dialog.data.category.id,
				storeId: dialog.data.category.storeId
			});

			setImage({ file: null, preview: "", dirty: false });
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
		return dialog.type === 'edit' ? dispatch(closeEditMenuItemDialog()) : dispatch(closeNewMenuItemDialog());
	}

	/**
	 * Form Submit
	 */
	const onSubmit = async (data) => {
		let imageUrl = "";
		if (image.dirty) {
			try {
				const fileName = uuid()
				const result = await Storage.put(fileName, image.file)
				imageUrl = result.key
			} catch (err) {
				console.log(err)
			}
		}
		if (dialog.type === 'new') {
			dispatch(addMenuItem({
				...data,
				imageUrl
			}))

		} else {
			const updateData = {
				...data,
				imageUrl: image.dirty ? imageUrl : dialog.data.imageUrl
			}
			dispatch(updateMenuItem({
				id: dialog.data.id, data: updateData
			}))
		}


		closeComposeDialog();
	}

	function onImageUpload(event) {
		if (!event.target.files.length) {
			return;
		}
		setImage({ file: event.target.files[0], preview: URL.createObjectURL(event.target.files[0]), dirty: true })
	}


	return (
		<Dialog
			classes={{
				paper: 'm-2'
			}}
			{...dialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="sm"
		>
			<AppBar position="static" elevation={0}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{dialog.type === 'new' ? 'New Service' : 'Edit Service'}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					<Typography variant="h6" color="inherit" className="pt-8">
						{dialog.data && dialog.data.category && dialog.data.category.name}
					</Typography>
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:overflow-hidden">


				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<div className="flex-1">
							<input type="file" id="image-url" className="hidden" onChange={onImageUpload} />
							<label htmlFor="image-url" className="text-7xl">
								{image.preview && <img src={image.preview} alt="" />}
								<AddAPhotoIcon fontSize="inherit" />
							</label>
						</div>

						<div>

							<div className="flex flex-1">
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
								<Controller
									control={control}
									name="size"
									render={({ field }) => (
										<TextField
											{...field}
											className="mb-24"
											label="Size"
											id="size"
											autoComplete="off"
											error={!!errors.size}
											helperText={errors?.size?.message}
											variant="outlined"
											required
											fullWidth
										/>
									)}
								/>
							</div>


							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">attach_money</Icon>
								</div>
								<Controller
									control={control}
									name="price"
									render={({ field }) => (
										<TextField
											{...field}
											className="mb-24"
											label="Price"
											id="price"
											autoComplete="off"
											onChange={e => field.onChange(parseFloat(e.target.value))}
											error={!!errors.price}
											helperText={errors?.price?.message}
											variant="outlined"
											required
											fullWidth
										/>
									)}
								/>
							</div>



							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">note</Icon>
								</div>
								<Controller
									control={control}
									name="description"
									render={({ field }) => (
										<TextField
											{...field}
											className="mb-24"
											label="Description"
											id="description"
											variant="outlined"
											multiline
											rows={5}
											fullWidth
										/>
									)}
								/>
							</div>

						</div>
						<div className="flex-1">
							<AddonPicker />
						</div>
					</div>


					<DialogActions className="justify-between p-4 pb-16">
						<Button variant="contained" color="default" onClick={closeComposeDialog}>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="secondary"
							type="submit"
							disabled={(_.isEmpty(dirtyFields) && !image.dirty) || !isValid}
						>
							{dialog.type === 'new' ? 'Add' : 'Save'}
						</Button>
					</DialogActions>

				</DialogContent>
			</form>
		</Dialog>
	);
}

export default ServicetDialog;
