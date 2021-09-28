import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import AddonTable from 'app/main/manages/menu/addons/AddonTable';
import { useDispatch } from 'react-redux';
import { deleteAddonGroup, openEditAddonGroupDialog } from '../../store/addonSlice';

function CategoryPage({ treeServices }) {
    const dispatch = useDispatch();

	return treeServices.length ? (
		treeServices.map((addonGroup, index) => (
			<Accordion key={index}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-label="Expand"
					aria-controls="additional-actions1-content"
					id="additional-actions1-header"
				>
					<div className="flex-col items-start">
						<div className="flex justify-between items-center">
							<Typography variant="h6">{addonGroup.name}</Typography>
							<IconButton
								aria-label="edit service"
								className="px-10"
								color="secondary"
								onClick={ev => {
                                    ev.stopPropagation();
                                    dispatch(openEditAddonGroupDialog(addonGroup))
								}}
							>
								<Icon>edit</Icon>
							</IconButton>

                            <IconButton
								aria-label="delete addon group"
								className="px-10"
								onClick={ev => {
									ev.stopPropagation();
									dispatch(deleteAddonGroup(addonGroup.id))
								}}
							>
								<DeleteOutlinedIcon color="error"/>
							</IconButton>
						</div>
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<AddonTable addonGroup={addonGroup}/>
				</AccordionDetails>
			</Accordion>
		))
	) : (
		<div className="text-center">No Category found</div>
	);
}

export default CategoryPage;
