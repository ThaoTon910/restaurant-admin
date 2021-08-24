import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import _ from '@lodash';
import * as yup from 'yup';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
	updateCategory,
	addCategory,
	closeNewCategoryDialog,
	closeEditCategoryDialog
} from '../store/categoriesSlice';

const defaultValues = {
	name: '',
	description: '',
	storeId: ''
};

const schema = yup.object().shape({
	name: yup.string().required('You must enter a name')
});

function CategorytDialog(props) {
	const dispatch = useDispatch();
	const dialog = useSelector(({ restaurantApp }) => restaurantApp.categories.dialog);

	const { control, reset, handleSubmit, formState, getValues } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
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
			reset({ ...dialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (dialog.type === 'new') {
			reset({
				...defaultValues,
				...dialog.data
			});
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
		return dialog.type === 'edit'
			? dispatch(closeEditCategoryDialog())
			: dispatch(closeNewCategoryDialog());
	}

	/**
	 * Form Submit
	 */
	function onSubmit(data) {
		if (dialog.type === 'new') {
			dispatch(addCategory(data));
		} else {
			dispatch(updateCategory({ ...dialog.data, ...data }));
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
						{dialog.type === 'new' ? 'New Category' : 'Edit Category'}
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

export default CategorytDialog;
