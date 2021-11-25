import { Controller, useFormContext } from 'react-hook-form';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Grow from '@material-ui/core/Grow';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ToggleButton from '@material-ui/lab/ToggleButton';

const useStyles = makeStyles(theme => ({
	dayToggle: {
		minWidth: '5em',
		borderRadius: '16px'
	},
	daySelected: {
		color: 'green',
		backgroundColor: 'green'
	}
}));

export default function HoursEdit(props) {
	const { control, watch } = useFormContext();
	const classes = useStyles();
	const hours = watch('hours');

	return (
		<TableContainer className="max-w my-16" component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className="font-semibold text-12 text-center">Date</TableCell>
						<TableCell className="font-semibold text-12 text-center">From</TableCell>
						<TableCell className="font-semibold text-12 text-center">To</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{hours && hours.map((hourDate, idx) => (
							<TableRow key={idx}>
								<TableCell className="p-12" align="center">
									<Controller
										defaultValue={hourDate.day}
										render={({ field }) => (
											<ToggleButton
												{...field}
												value={hourDate.day}
												selected={!field.value}
												onChange={() => field.onChange(!field.value)}
												color="secondary"
												classes={{ root: classes.dayToggle, selected: classes.daySelected }}
												className="font-semibold text-3 p-3.5"
											>
												<div>{hourDate.day.substring(0, 3)}</div>
											</ToggleButton>
										)}
										rules={{ required: true }}
										name={`hours[${idx}].off`}
										control={control}
									/>
								</TableCell>
								<TableCell className="p-6" align="center">
									<Controller
										defaultValue={hourDate.start}
										render={({ field }) => (
											<Grow in={!hourDate.off}>
												<TextField
													{...field}
													size="small"
													variant="outlined"
													type="time"
													InputLabelProps={{
														shrink: true
													}}
													inputProps={{
														step: 300 // 5 min
													}}
												/>
											</Grow>
										)}
										rules={{ required: true }}
										name={`hours[${idx}].start`}
										control={control}
									/>
								</TableCell>
								<TableCell className="p-6" align="center">
									<Controller
										defaultValue={hourDate.end}
										render={({ field }) => (
											<Grow in={!hourDate.off}>
												<TextField
													{...field}
													size="small"
													variant="outlined"
													type="time"
													InputLabelProps={{
														shrink: true
													}}
													inputProps={{
														step: 300 // 5 min
													}}
												/>
											</Grow>
										)}
										rules={{ required: true }}
										name={`hours[${idx}].end`}
										control={control}
									/>
								</TableCell>
							</TableRow>
						))
					}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
