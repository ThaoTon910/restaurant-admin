import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitVerifyCode } from 'app/auth/store/verifyCodeSlice';
import * as yup from 'yup';
import _ from '@lodash';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import cognitoService from 'app/services/cognitoService';
import { showMessage } from '../../../../store/fuse/messageSlice';

const schema = yup.object().shape({
	// username: yup.string().required('You must enter username'),
	email: yup.string().email('You must enter a valid email').required('You must enter a email'),
	code: yup.string().required('Enter your code.')
});

const defaultValues = {
	username: '',
	email: '',
	code: ''
};

function CognitoVerifyCodeTab(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const authVerifyCode = useSelector(({ auth }) => auth.verifyCode);
	const [formError, setFormError] = useState();
	const [showFormValidation, setShowFormValidation] = useState(false);
	const username =
		authVerifyCode.userInfo && authVerifyCode.userInfo.user && authVerifyCode.userInfo.user.username
			? authVerifyCode.userInfo.user.username
			: '';
	if (!username) {
		// no username, redirect to home
		history.push('/');
	}

	const { control, formState, handleSubmit, reset, setError, getValues, trigger } = useForm({
		mode: 'onChange',
		defaultValues: { ...defaultValues, username, email: username },
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, isDirty, errors } = formState;

	useEffect(() => {
		// SAMPLE ERROR
		// {
		// 	code :"UserNotFoundException"
		// 	name :"UserNotFoundException"
		// 	message :"Username/client id combination not found."
		// }
		setFormError(authVerifyCode.errors.message);
	}, [authVerifyCode.errors, setFormError]);

	function onSubmit(event) {
		event.preventDefault();
		trigger();
		const model = getValues();
		model.username = model.email;
		if (isValid) {
			setFormError(null);
			dispatch(submitVerifyCode(model));
		} else {
			setShowFormValidation(true);
		}
	}

	function onResendCode() {
		cognitoService
			.resendCode(username)
			.then(user => {
				dispatch(
					showMessage({
						message: `Passcode resent to ${user.CodeDeliveryDetails.Destination}`,
						variant: 'success'
					})
				);
			})
			.catch(err => setFormError(err));
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
							error={showFormValidation && !!errors.email}
							helperText={showFormValidation && errors?.email?.message}
							label="Email"
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

				<div className="flex gap-8">
					<Typography color="textSecondary" className="font-normal">
						Lost Your Code?
					</Typography>
					<Typography
						color="secondary"
						className="font-normal cursor-pointer hover:underline"
						onClick={onResendCode}
					>
						Resend Code
					</Typography>
				</div>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16"
					aria-label="CONFIRM"
					disabled={showFormValidation && (_.isEmpty(dirtyFields) || !isValid)}
					value="legacy"
					onClick={onSubmit}
				>
					Confirm
				</Button>
			</form>
		</div>
	);
}

export default CognitoVerifyCodeTab;
