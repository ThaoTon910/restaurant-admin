import clsx from 'clsx';
import { motion } from 'framer-motion';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(theme => ({
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

export function AuthRightPanel() {
	const classes = useStyles();
	return (
		<div className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}>
			<div className="max-w-320">
				<motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}>
					<Typography variant="h3" color="inherit" className="font-semibold leading-tight">
						Welcome to Pho26
					</Typography>
				</motion.div>

				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
					{/*<Typography variant="subtitle1" color="inherit" className="mt-32">*/}
					{/*	Powerful and professional admin template for Web Applications, CRM, CMS, Admin Panels and more.*/}
					{/*</Typography>*/}
				</motion.div>
			</div>
		</div>
	);
}

export default AuthRightPanel;
