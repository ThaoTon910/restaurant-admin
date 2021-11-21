import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { Typography } from '@material-ui/core';
import { submitLogin } from '../../../../auth/store/loginSlice';
import cognitoService from '../../../../services/cognitoService/cognitoService';
import { showMessage } from '../../../../store/fuse/messageSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	email: yup.string().email('You must enter a valid email').required('You must enter a email'),
	code: yup.string().required('Enter your code.'),
	password: yup
		.string()
		.required('Please enter your password.')
		.min(8, 'Password is too short - should be 8 chars minimum.'),
	passwordConfirm: yup
		.string()
		.required('Please enter your password.')
		.oneOf([yup.ref('password'), null], 'Passwords must match')
});

const defaultValues = {
	email: '',
	username: '',
	code: '',
	password: '',
	passwordConfirm: ''
};

function CognitoResetPasswordTab({ model }) {
	const dispatch = useDispatch();
	const [formError, setFormError] = useState();
	const [loading, setLoading] = useState(false);
	const [showFormValidation, setShowFormValidation] = useState(false);

	const { control, formState, handleSubmit, reset, setError, getValues, trigger } = useForm({
		mode: 'onChange',
		defaultValues: { ...defaultValues, ...model },
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, isDirty, errors } = formState;

	useEffect(() => {
		reset({ ...defaultValues, ...model });
	}, [reset, model]);

	function onSubmit(event) {
		event.preventDefault();
		trigger();
		const formModel = getValues();
		formModel.username = formModel.email;
		if (isValid) {
			setLoading(true);
			cognitoService
				.forgotPasswordSubmit(formModel)
				.then(user => {
					setLoading(false);
					dispatch(showMessage({ message: `Your password has been reset`, variant: 'success' }));
					dispatch(submitLogin({ username: formModel.username, password: formModel.password }));
				})
				.catch(error => {
					setFormError(error.message);
					reset({ ...formModel, password: '', passwordConfirm: '', code: '' });
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
							disabled
							required
						/>
					)}
				/>

				<Controller
					name="code"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							label="Confirmation Code"
							error={showFormValidation && !!errors.code}
							helperText={showFormValidation && errors?.code?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											vpn_key
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							autoComplete="off"
							required
						/>
					)}
				/>

				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="password"
							label="Password"
							error={showFormValidation && !!errors.password}
							helperText={showFormValidation && errors?.password?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											vpn_key
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>

				<Controller
					name="passwordConfirm"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="password"
							label="Confirm Password"
							error={showFormValidation && !!errors.passwordConfirm}
							helperText={showFormValidation && errors?.passwordConfirm?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											vpn_key
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
