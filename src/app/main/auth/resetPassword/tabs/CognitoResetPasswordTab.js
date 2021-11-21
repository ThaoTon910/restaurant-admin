import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { Typography } from '@material-ui/core';
import cognitoService from '../../../../services/cognitoService/cognitoService';
import { showMessage } from '../../../../store/fuse/messageSlice';

const schema = yup.object().shape({
	email: yup.string().email('You must enter a valid email').required('You must enter a email')
});

const defaultValues = {
	email: '',
	username: ''
};

function CognitoResetPasswordTab({ setModel }) {
	const dispatch = useDispatch();
	const [formError, setFormError] = useState();
	const [loading, setLoading] = useState(false);
	const [showFormValidation, setShowFormValidation] = useState(false);

	const { control, formState, handleSubmit, reset, setError, getValues, trigger } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, isDirty, errors } = formState;

	function onSubmit(event) {
		event.preventDefault();
		trigger();
		const model = getValues();
		model.username = model.email;
		if (isValid) {
			setLoading(true);
			cognitoService
				.forgotPassword(model)
				.then(user => {
					setLoading(false);
					setModel(model);
					dispatch(
						showMessage({
							message: `Successfully sent message to ${user.CodeDeliveryDetails.Destination}`,
							variant: 'success'
						})
					);
				})
				.catch(error => {
					setFormError(error.message);
					reset({ username: '', email: '' });
					setLoading(false);
				});
		} else {
			setShowFormValidation(true);
		}
	}

	return (
		<div className="w-full">
			<form className="flex flex-col justify-center w-full">
				{formError && (
					<Typography color="error" className="mb-16">
						{formError}
					</Typography>
				)}

				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							label="Email"
							error={showFormValidation && !!errors.email}
							helperText={showFormValidation && errors?.email?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											email
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16"
					aria-label="LOGIN"
					disabled={showFormValidation && (_.isEmpty(dirtyFields) || !isValid)}
					value="legacy"
					onClick={onSubmit}
				>
					{loading ? <CircularProgress size={20} /> : 'Submit'}
				</Button>
			</form>
		</div>
	);
}

export default CognitoResetPasswordTab;
