import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CognitoLoginTab from './tabs/CognitoLoginTab';
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

function Login() {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

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
						<CognitoLoginTab />
					</AuthWrapperPanel>

					<div className="flex flex-col items-center justify-center pb-32">
						<div>
							<span className="font-normal mr-8">Forgot your password?</span>
							<Link className="font-normal" to="/auth/reset-password">
								Reset password
							</Link>
						</div>
						<div className="mt-8">
							<span className="font-normal mr-8">Don't have an account?</span>
							<Link className="font-normal" to="/auth/register">
								Register
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

export default Login;
