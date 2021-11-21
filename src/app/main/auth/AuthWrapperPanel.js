import { motion } from 'framer-motion';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

export function AuthWrapperPanel(props) {
	return (
		<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
				<div className="flex items-center mb-48">
					<img className="logo-icon w-48" src="assets/images/logos/26.jpg" alt="logo" />
					<div className="border-l-1 mr-4 w-1 h-40" />
					<div>
						<Typography className="text-24 font-semibold logo-text" color="inherit">
							Pho26
						</Typography>
						{/*<Typography className="text-16 tracking-widest -mt-8 font-700" color="textSecondary">*/}
						{/*	REACT*/}
						{/*</Typography>*/}
					</div>
				</div>
			</motion.div>
			{props.children}
		</CardContent>
	);
}

export default AuthWrapperPanel;
