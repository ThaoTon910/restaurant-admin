import { Link, withRouter } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TextField from '@material-ui/core/TextField';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import HoursEdit from '../../../../shared-components/HoursEdit';

import MuiPhoneNumberDefault from '../../../../shared-components/MuiPhoneNumberDefault';
import restaurantService from '../../../../services/restaurantService';
import { StoreContextDispatch, STORE_ACTION_SET_HEADER_LEFT_RIGHT } from './context/StoreContext';

function StoreSaveButton({ disabled, handleUpdateStore }) {
	return (
		<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
			<Button
				className="whitespace-nowrap"
				variant="contained"
				color="secondary"
				disabled={disabled}
				onClick={handleUpdateStore}
			>
				<span className="flex">Save</span>
			</Button>
		</motion.div>
	);
}

function StoreGoBackButton({ path }) {
	return (
		<motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}>
			<Button component={Link} to={path} className="whitespace-nowrap" variant="contained" color="primary">
				<span className="flex">Back</span>
			</Button>
		</motion.div>
	);
}

/**
 * Form Validation Schema
 */
const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const schema = yup.object().shape({
	name: yup.string().required('Please enter your store name'),
	phone: yup
		.string()
		.required('Please enter your store phone number')
		.matches(phoneRegExp, 'Phone number is not valid'),
	address: yup.string().required('Please enter your store address')
});

function StoreEdit({ location, history, match }) {
	const dispatch = useDispatch();
	const { storeId } = match.params;
	const storeContextDispatch = useContext(StoreContextDispatch);
	const [selectedStore, setSelectedStore] = useState(null);
	const [showFormValidation, setShowFormValidation] = useState(false);
	const methods = useForm({
		defaultValues: selectedStore, // initial value
		mode: 'onChange',
		resolver: yupResolver(schema)
	});

	// restaurantService.getMerchant();
	useEffect(() => {
		restaurantService.getMerchant().then(response => {
			// console.log("merchant ", response);
			setSelectedStore(response.data)
		})

	}, [])
	const {
		getValues,
		register,
		formState: { isValid, isDirty, errors },
		reset,
		control,
		watch
	} = methods;

	useEffect(() => {
		reset(selectedStore);
	}, [reset, selectedStore]);

	useEffect(() => {
		let disabled = true;
		if (isDirty) {
			if (!showFormValidation) {
				disabled = false;
			} else disabled = !isValid;
		}

		storeContextDispatch({
			type: STORE_ACTION_SET_HEADER_LEFT_RIGHT,
			payload: {
				leftHeaderPath: 'Edit',
				rightHeaderContent:
					<StoreSaveButton
						disabled={disabled}
						handleUpdateStore={() => {
							if (isValid) {
								if (isDirty) {
									restaurantService.updateMerchant(getValues()).then(response => {
										// console.log("merchant ", response);
										if (response.data) {
											setSelectedStore({
												...response.data,
												updatedTime: undefined,
												createdTime: undefined,
												id: undefined
											})
										}

									})
									// dispatch(updateStore(getValues()));
								}
							} else if (!showFormValidation) {
								setShowFormValidation(true);
							}
						}}
					 />
			}
		});

		return () => {
			// Clean up when leaving the page
			storeContextDispatch({
				type: STORE_ACTION_SET_HEADER_LEFT_RIGHT,
				payload: { leftHeaderPath: null, rightHeaderContent: null }
			});
		};
	}, [storeContextDispatch, dispatch, getValues, isDirty, isValid, showFormValidation, selectedStore]);

	return (
		<>
			{selectedStore ? (
				<FormProvider {...methods}>
					<form>
						<TableContainer className='max-w my-16' component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell className='font-semibold text-14'>Store Information</TableCell>
										<TableCell />
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell className='w-1/3'>Name</TableCell>
										<TableCell>
											<Controller
												defaultValue={selectedStore.name}
												render={({ field }) => (
													<TextField
														className='w-full'
														{...field}
														autoComplete='off'
														size='small'
														variant='outlined'
														error={showFormValidation && errors.name}
														helperText={
															showFormValidation && errors.name ? errors.name.message : null
														}
													/>
												)}
												rules={{ required: true }}
												name='name'
												control={control}
											/>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className='w-1/3'>Phone</TableCell>
										<TableCell>
											<Controller
												defaultValue={selectedStore.phone}
												render={({ field }) => (
													<MuiPhoneNumberDefault
														autoComplete='off'
														className='w-full'
														name='phone'
														value={field.value}
														onBlur={field.onBlur}
														onChange={field.onChange}
														error={showFormValidation && errors.phone}
														helperText={
															showFormValidation && errors.phone ? errors.phone.message : null
														}
													/>
												)}
												rules={{ required: true }}
												name='phone'
												control={control}
											/>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className='w-1/3'>Address</TableCell>
										<TableCell>
											<Controller
												defaultValue={selectedStore.address}
												render={({ field }) => (
													<TextField
														className='w-full'
														{...field}
														autoComplete='off'
														size='small'
														variant='outlined'
														error={showFormValidation && errors.address}
														helperText={
															showFormValidation && errors.address ? errors.address.message : null
														}
													/>
												)}
												rules={{ required: true }}
												name='address'
												control={control}
											/>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
						<HoursEdit />
					</form>
				</FormProvider>
			) : null}
			<StoreGoBackButton path='/manage/about' />
		</>
	);
}

export default withRouter(StoreEdit);
