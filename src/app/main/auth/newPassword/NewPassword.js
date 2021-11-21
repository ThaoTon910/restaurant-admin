import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import CognitoNewPassWordTab from './tabs/CognitoNewPassWordTab';
import { AuthWrapperPanel } from '../AuthWrapperPanel';
import { AuthRightPanel } from '../AuthRightPanel';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {}
}));

function NewPassword() {
	const classes = useStyles();
	const history = useHistory();
	const [model, setModel] = useState(history.location.state);
	useEffect(() => {
		if (!history.location.state) {
			history.push('/');
		} else {
			setModel(history.location.state);
		}
	}, [history]);

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.6 }}
				animate={{ opacity: 1, scale: 1 }}
				className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
			>
				<Card
					className={clsx(
						classes.leftSection,
						'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
					)}
					square
				>
					<AuthWrapperPanel>
						<Typography className="h3 font-medium w-full mb-8" color="primary">
							Reset your password
						</Typography>
						<CognitoNewPassWordTab model={model} />
					</AuthWrapperPanel>

					<div className="flex flex-col items-center justify-center pb-32">
						<div>
							<Link className="font-normal" to="/auth/login">
								Back to Sign In
							</Link>
						</div>
						<Link className="font-normal mt-8" to="/">
							Back to Dashboard
						</Link>
					</div>
				</Card>

				<AuthRightPanel />
			</motion.div>
		</div>
	);
}

export default NewPassword;
