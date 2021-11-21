import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { Typography } from '@material-ui/core';
import { submitLogin } from '../../../../auth/store/loginSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	// username: yup.string(),
	email: yup.string().email('You must enter a valid email').required('You must enter a email'),
	password: yup
		.string()
		.required('Please enter your password.')
		.min(8, 'Password is too short - should be 8 chars minimum.')
});

const defaultValues = {
	username: '',
	email: '',
	password: ''
};

function CognitoLoginTab(props) {
	const dispatch = useDispatch();
	const authLogin = useSelector(({ auth }) => auth.login);
	const [formError, setFormError] = useState();
	const [showFormValidation, setShowFormValidation] = useState(false);

	const { control, formState, handleSubmit, reset, setError, getValues, trigger } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, isDirty, errors } = formState;

	useEffect(() => {
		// SAMPLE ERROR
		// code:"UsernameExistsException"
		// name:"UsernameExistsException"
		// message:"An account with the given email already exists."

		authLogin.errors && setFormError(authLogin.errors.message);
		reset({ ...getValues(), password: '' });
	}, [dispatch, reset, authLogin.errors, setFormError, getValues]);

	function onSubmit(event) {
		event.preventDefault();
		trigger();
		const model = getValues();
		model.username = model.email;
		if (isValid) {
			dispatch(submitLogin(model));
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
							autoComplete="current-password"
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
					{authLogin.loading ? <CircularProgress size={20} /> : 'Login'}
				</Button>
			</form>
		</div>
	);
}

export default CognitoLoginTab;
